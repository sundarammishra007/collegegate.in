import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import { SYSTEM_INSTRUCTION_COUNSELOR, SYSTEM_INSTRUCTION_STUDENT } from '../constants';
import { blobToBase64 } from '../services/geminiService';
import { User } from '../types';

// --- Audio Utilities (strictly following guide) ---

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// --- Component ---

interface LiveCounselorProps {
    user: User | null;
}

const LiveCounselor: React.FC<LiveCounselorProps> = ({ user }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isTalking, setIsTalking] = useState(false); // Model is talking
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Audio Context Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  // Session Refs
  const sessionRef = useRef<any>(null); // For cleanup
  const activeSessionRef = useRef<any>(null); // For sending user input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isTrainee = user?.role === 'TRAINEE';

  const stopAudio = useCallback(() => {
    // Stop all playing sources
    if (sourcesRef.current) {
        for (const source of sourcesRef.current.values()) {
            try {
                source.stop();
            } catch (e) {
                // Ignore errors if already stopped
            }
            sourcesRef.current.delete(source);
        }
    }
    // Reset timing
    nextStartTimeRef.current = 0;
    setIsTalking(false);
  }, []);

  const ensureApiKey = async () => {
      // Check for Google AI Studio Key Selection environment
      if ((window as any).aistudio) {
          try {
              const hasKey = await (window as any).aistudio.hasSelectedApiKey();
              if (!hasKey) {
                  await (window as any).aistudio.openSelectKey();
              }
          } catch (e) {
              console.error("API Key selection error:", e);
              throw new Error("API Key selection process was interrupted.");
          }
      }
  };

  const connectToLiveAPI = async () => {
    setError(null);
    try {
      await ensureApiKey();
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Setup Audio Contexts
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination); // Ensure output connects to speakers

      // Get Mic Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Live Session Opened');
            setIsConnected(true);
            
            // Stream audio from the microphone to the model.
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            
            // Store cleanup function for mic
            sessionRef.current = {
               close: async () => {
                 scriptProcessor.disconnect();
                 source.disconnect();
                 stream.getTracks().forEach(t => t.stop());
                 // @ts-ignore
                 const session = await sessionPromise;
                 // session.close() is typically handled by the caller or implicitly
               }
            };
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setIsTalking(true);
              // Ensure output context is running (browsers block autoplay)
              if (outputCtx.state === 'suspended') {
                  await outputCtx.resume();
              }

              nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                outputCtx.currentTime
              );
              
              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                outputCtx,
                24000,
                1
              );
              
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) {
                    setIsTalking(false);
                }
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // Handle Interruptions
            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              console.log("Model interrupted");
              stopAudio();
            }
          },
          onclose: () => {
            console.log('Live Session Closed');
            setIsConnected(false);
            setIsTalking(false);
            activeSessionRef.current = null;
          },
          onerror: (e) => {
            console.error('Live API Error', e);
            setError("Connection failed. Please check your network or API key.");
            setIsConnected(false);
            activeSessionRef.current = null;
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            // Use different voices for Counselor vs Student simulation
            voiceConfig: { prebuiltVoiceConfig: { voiceName: isTrainee ? 'Puck' : 'Zephyr' } }, 
          },
          // Select instruction based on user role
          systemInstruction: isTrainee ? SYSTEM_INSTRUCTION_STUDENT : SYSTEM_INSTRUCTION_COUNSELOR,
        },
      });

      // Capture active session for external inputs (file uploads)
      sessionPromise.then(s => {
          activeSessionRef.current = s;
      });
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to start audio session");
    }
  };

  const disconnect = async () => {
    if (sessionRef.current) {
        await sessionRef.current.close();
        sessionRef.current = null;
    }
    if (activeSessionRef.current) {
        activeSessionRef.current = null;
    }
    
    // Proper AudioContext cleanup
    if (inputAudioContextRef.current) {
        if (inputAudioContextRef.current.state !== 'closed') {
           await inputAudioContextRef.current.close();
        }
        inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
        if (outputAudioContextRef.current.state !== 'closed') {
            await outputAudioContextRef.current.close();
        }
        outputAudioContextRef.current = null;
    }
    stopAudio();
    setIsConnected(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isConnected || !activeSessionRef.current) {
        setError("Please start the call first.");
        return;
    }

    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Simple check for image types
        if (!file.type.startsWith('image/')) {
            setError("Please upload an image file (JPEG/PNG) of your document.");
            return;
        }

        try {
            const base64 = await blobToBase64(file);
            
            // Send image to the active session
            await activeSessionRef.current.sendRealtimeInput({
                media: { 
                    mimeType: file.type, 
                    data: base64 
                }
            });

            setToastMessage("Document uploaded! The AI is analyzing it...");
            setTimeout(() => setToastMessage(null), 3000);
            
            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = '';

        } catch (err) {
            console.error("Upload error:", err);
            setError("Failed to upload document.");
        }
    }
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center h-full w-full rounded-3xl overflow-hidden relative shadow-2xl border ${isTrainee ? 'bg-slate-900 border-teal-500/50' : 'bg-slate-900 border-slate-700'}`}>
      
      {/* Background Ambience */}
      <div className={`absolute inset-0 z-0 bg-gradient-to-br ${isTrainee ? 'from-teal-900/30 to-slate-900' : 'from-indigo-900/40 to-purple-900/40'}`}></div>

      {/* Trainee Badge */}
      {isTrainee && (
          <div className="absolute top-4 right-4 z-20 bg-teal-500/20 border border-teal-500/30 text-teal-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Training Mode
          </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-emerald-600/90 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md shadow-lg z-50 animate-bounce-in flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {toastMessage}
          </div>
      )}

      <div className="z-10 flex flex-col items-center text-center p-8 space-y-8 w-full max-w-md">
        
        {/* Status Indicator */}
        <div className="relative">
             <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${isConnected ? (isTrainee ? 'bg-teal-600/20' : 'bg-indigo-600/20') : 'bg-slate-700/20'}`}>
                {isConnected ? (
                     <div className="relative w-full h-full flex items-center justify-center">
                        {/* Ripple Effect when talking */}
                        {isTalking && (
                            <>
                                <div className={`absolute w-full h-full rounded-full border-4 opacity-20 animate-ping ${isTrainee ? 'border-teal-400' : 'border-indigo-400'}`}></div>
                                <div className={`absolute w-24 h-24 rounded-full border-4 opacity-40 animate-pulse ${isTrainee ? 'border-teal-300' : 'border-indigo-300'}`}></div>
                            </>
                        )}
                        <div className={`w-20 h-20 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-tr ${isTrainee ? 'from-teal-500 to-emerald-500' : 'from-indigo-500 to-purple-500'}`}>
                            <span className="text-4xl">{isTrainee ? '🎓' : '🎙️'}</span>
                        </div>
                     </div>
                ) : (
                    <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center shadow-inner">
                        <span className="text-4xl text-slate-500">📵</span>
                    </div>
                )}
             </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold text-white mb-2">
                {isTrainee ? 'Practice Session' : 'Anonymous Voice Lounge'}
            </h2>
            <p className="text-slate-400 max-w-xs mx-auto">
                {isConnected 
                    ? isTalking 
                        ? (isTrainee ? "AI Student is asking..." : "Counselor is speaking...") 
                        : "Listening... (Speak or Upload Doc)" 
                    : (isTrainee ? "Start a mock session with an AI student to practice your skills." : "Connect privately with our AI Counselor regarding colleges, fees, or exams.")}
            </p>
            {error && <p className="text-red-400 mt-2 text-sm bg-red-900/20 p-2 rounded-lg border border-red-500/20">{error}</p>}
        </div>

        <div className="flex flex-col gap-4 w-full">
            <button
                onClick={isConnected ? disconnect : connectToLiveAPI}
                className={`w-full px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl ${
                    isConnected 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : (isTrainee ? 'bg-teal-600 hover:bg-teal-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white')
                }`}
            >
                {isConnected ? 'End Call' : (isTrainee ? 'Start Practice Session' : 'Start Anonymous Call')}
            </button>
            
            {/* Document Upload Button - Only visible when connected */}
            <div className={`transition-all duration-300 ${isConnected ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/jpg"
                />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-6 py-3 rounded-xl font-medium text-indigo-200 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Show Document / Resume
                </button>
                <p className="text-[10px] text-slate-500 mt-2">Upload a document for context.</p>
            </div>
        </div>

        <p className="text-xs text-slate-500 mt-4">
            Identity protected. Voice processed via Gemini Safe Link.
        </p>

      </div>
    </div>
  );
};

export default LiveCounselor;
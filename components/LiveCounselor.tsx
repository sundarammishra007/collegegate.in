import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob, Type, FunctionDeclaration } from '@google/genai';
import { SYSTEM_INSTRUCTION_COUNSELOR, SYSTEM_INSTRUCTION_STUDENT } from '../constants';
import { blobToBase64 } from '../services/geminiService';
import { User } from '../types';

// --- Audio Utilities ---

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
  const [callDuration, setCallDuration] = useState(0);
  const [hasPromptedExpert, setHasPromptedExpert] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  
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

  // Timer logic for call duration and expert prompt
  useEffect(() => {
    let interval: number | undefined;
    if (isConnected) {
      interval = window.setInterval(() => {
        setCallDuration(prev => {
            const next = prev + 1;
            // Trigger expert suggestion at 60 seconds
            if (next === 60 && !hasPromptedExpert && activeSessionRef.current) {
                // We send a text message to the model to prompt it to ask the question naturally
                activeSessionRef.current.sendRealtimeInput({
                    text: "[SYSTEM: It has been 1 minute. Politely ask: 'If you don't mind, I can connect you to our expert guide of CollegeGate to assist you better.']"
                });
                setHasPromptedExpert(true);
            }
            return next;
        });
      }, 1000);
    } else {
      setCallDuration(0);
      setHasPromptedExpert(false);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected, hasPromptedExpert]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const stopAudio = useCallback(() => {
    if (sourcesRef.current) {
        for (const source of sourcesRef.current.values()) {
            try { source.stop(); } catch (e) {}
            sourcesRef.current.delete(source);
        }
    }
    nextStartTimeRef.current = 0;
    setIsTalking(false);
  }, []);

  const ensureApiKey = async () => {
      if ((window as any).aistudio) {
          try {
              const hasKey = await (window as any).aistudio.hasSelectedApiKey();
              if (!hasKey) { await (window as any).aistudio.openSelectKey(); }
          } catch (e) {
              console.error("API Key selection error:", e);
              throw new Error("API Key selection failed.");
          }
      }
  };

  const generateCollegeImageTool: FunctionDeclaration = {
    name: 'generateCollegeImage',
    parameters: {
      type: Type.OBJECT,
      description: 'Generates an image of a college campus or building based on a description.',
      properties: {
        prompt: {
          type: Type.STRING,
          description: 'A detailed description of the campus or building to visualize.',
        },
      },
      required: ['prompt'],
    },
  };

  const handleImageGeneration = async (prompt: string) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: `Photorealistic college campus visualization: ${prompt}` }] },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const b64 = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                setGeneratedImages(prev => [b64, ...prev]);
                return "Image generated successfully.";
            }
        }
        return "Image generation failed.";
    } catch (err) {
        console.error("Tool execution failed:", err);
        return "Error occurred during image generation.";
    }
  };

  const connectToLiveAPI = async () => {
    setError(null);
    try {
      await ensureApiKey();
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
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
            
            sessionRef.current = {
               close: async () => {
                 scriptProcessor.disconnect();
                 source.disconnect();
                 stream.getTracks().forEach(t => t.stop());
               }
            };
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.toolCall) {
                for (const fc of message.toolCall.functionCalls) {
                    if (fc.name === 'generateCollegeImage') {
                        const res = await handleImageGeneration(fc.args.prompt as string);
                        sessionPromise.then((session) => {
                            session.sendToolResponse({
                                functionResponses: {
                                    id: fc.id,
                                    name: fc.name,
                                    response: { result: res },
                                }
                            });
                        });
                    }
                }
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setIsTalking(true);
              if (outputCtx.state === 'suspended') await outputCtx.resume();
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsTalking(false);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) stopAudio();
          },
          onclose: () => { setIsConnected(false); setIsTalking(false); activeSessionRef.current = null; },
          onerror: (e) => { setError("Connection failed."); setIsConnected(false); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: isTrainee ? 'Puck' : 'Zephyr' } }, 
          },
          tools: [{ functionDeclarations: [generateCollegeImageTool] }],
          systemInstruction: isTrainee ? SYSTEM_INSTRUCTION_STUDENT : SYSTEM_INSTRUCTION_COUNSELOR,
        },
      });

      sessionPromise.then(s => { activeSessionRef.current = s; });
      
    } catch (err: any) {
      setError(err.message || "Failed to start audio session");
    }
  };

  const disconnect = async () => {
    if (sessionRef.current) await sessionRef.current.close();
    if (inputAudioContextRef.current) await inputAudioContextRef.current.close();
    if (outputAudioContextRef.current) await outputAudioContextRef.current.close();
    stopAudio();
    setIsConnected(false);
    setGeneratedImages([]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isConnected || !activeSessionRef.current) return;
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        try {
            const base64 = await blobToBase64(file);
            await activeSessionRef.current.sendRealtimeInput({
                media: { mimeType: file.type, data: base64 }
            });
            setToastMessage("Analyzing document...");
            setTimeout(() => setToastMessage(null), 3000);
        } catch (err) { setError("Failed to upload document."); }
    }
  };

  return (
    <div className={`flex flex-col md:flex-row h-full w-full rounded-3xl overflow-hidden relative shadow-2xl border transition-all duration-500 ${isTrainee ? 'bg-slate-900 border-teal-500/30' : 'bg-slate-950 border-slate-800'}`}>
      
      <div className={`absolute inset-0 z-0 bg-gradient-to-br ${isTrainee ? 'from-teal-900/20 to-slate-950' : 'from-indigo-950 to-slate-950'}`}></div>

      {/* Main Content Area */}
      <div className={`flex-grow z-10 flex flex-col items-center text-center p-8 space-y-8 relative overflow-y-auto ${generatedImages.length > 0 ? 'md:w-2/3' : 'w-full'}`}>
        
        {isTrainee && (
            <div className="absolute top-4 right-4 bg-teal-500/10 border border-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                Training Mode
            </div>
        )}

        {isConnected && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-white">
                <div className={`w-2 h-2 rounded-full ${isTalking ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                <span className="text-sm font-mono font-bold tracking-wider">{formatTime(callDuration)}</span>
            </div>
        )}

        {toastMessage && (
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-emerald-600/90 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md shadow-lg z-50 flex items-center gap-2">
                {toastMessage}
            </div>
        )}

        <div className="relative mt-8">
             {/* Visual Speaking Indicator */}
             <div className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-700 relative ${isConnected ? (isTrainee ? 'bg-teal-500/5' : 'bg-indigo-500/5') : 'bg-slate-800/20'}`}>
                
                {isConnected && (
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Pulse layers for when AI speaks */}
                        <div className={`absolute inset-0 rounded-full border-2 opacity-30 ${isTalking ? 'animate-[ping_2s_infinite]' : 'opacity-0'} ${isTrainee ? 'border-teal-400' : 'border-indigo-400'}`}></div>
                        <div className={`absolute inset-4 rounded-full border-2 opacity-20 ${isTalking ? 'animate-[ping_3s_infinite]' : 'opacity-0'} ${isTrainee ? 'border-teal-300' : 'border-indigo-300'}`}></div>
                    </div>
                )}

                <div className={`w-24 h-24 rounded-full shadow-2xl flex items-center justify-center bg-gradient-to-tr transition-all duration-500 ${isTalking ? 'scale-110' : 'scale-100'} ${
                    isConnected 
                    ? (isTrainee ? 'from-teal-500 to-emerald-600 shadow-teal-500/30' : 'from-indigo-600 to-purple-700 shadow-indigo-500/30')
                    : 'from-slate-800 to-slate-900 opacity-40'
                }`}>
                    <span className="text-5xl">{isConnected ? (isTrainee ? '🎓' : '🎙️') : '📵'}</span>
                </div>
                
                {/* Micro Equalizer Bar Animation */}
                {isTalking && (
                    <div className="absolute -bottom-6 flex items-end gap-1 h-8">
                        {[1,2,3,4,5].map(i => (
                            <div 
                                key={i} 
                                className={`w-1 rounded-full animate-bounce ${isTrainee ? 'bg-teal-400' : 'bg-indigo-400'}`}
                                style={{ 
                                    height: `${Math.random() * 80 + 20}%`,
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: `${0.4 + Math.random() * 0.4}s`
                                }}
                            ></div>
                        ))}
                    </div>
                )}
             </div>
        </div>

        <div>
            <h2 className={`text-2xl font-black mb-2 transition-colors ${isConnected ? 'text-white' : 'text-slate-500'}`}>
                {isTrainee ? 'Practice Lounge' : 'CollegeGate Voice AI'}
            </h2>
            <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                {isConnected 
                    ? isTalking 
                        ? (isTrainee ? "Trainee is speaking..." : "Our AI Guide is explaining...") 
                        : "Listening... Try asking about a skill roadmap or a college campus visualization." 
                    : "Connect privately for career and admission advice."}
            </p>
            {error && <p className="text-red-400 mt-4 text-xs font-bold uppercase tracking-widest">{error}</p>}
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
            <button
                onClick={isConnected ? disconnect : connectToLiveAPI}
                className={`w-full px-8 py-5 rounded-3xl font-black text-lg transition-all transform active:scale-95 shadow-2xl ${
                    isConnected 
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/20' 
                    : (isTrainee ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20')
                }`}
            >
                {isConnected ? 'End Consultation' : (isTrainee ? 'Enter Simulator' : 'Call AI Counselor')}
            </button>
            
            {isConnected && (
                <div className="animate-fade-in">
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full px-6 py-4 rounded-2xl font-bold transition-all border ${isTrainee ? 'bg-teal-500/5 border-teal-500/20 text-teal-400' : 'bg-white/5 border-white/10 text-indigo-300'}`}
                    >
                        Scan Transcript / Document
                    </button>
                </div>
            )}
        </div>

        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mt-auto">
            Secure • Anonymous • AI-Powered
        </p>
      </div>

      {/* Generated Images Sidebar */}
      {generatedImages.length > 0 && (
          <div className="w-full md:w-1/3 z-10 bg-black/30 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/5 p-6 overflow-y-auto animate-slide-left">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                  <span className="text-indigo-400 text-xl">🖼️</span>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Visualizations</h3>
              </div>
              <div className="space-y-6">
                  {generatedImages.map((img, idx) => (
                      <div key={idx} className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in">
                          <img src={img} alt={`Campus ${idx}`} className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <a href={img} download={`collegegate-vis-${idx}.png`} className="text-[10px] font-bold text-white uppercase tracking-widest bg-indigo-600 px-3 py-1 rounded-full shadow-lg">Download HD</a>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

    </div>
  );
};

export default LiveCounselor;
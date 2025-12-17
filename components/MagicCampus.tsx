import React, { useState, useRef } from 'react';
import { editImageWithGemini, generateCampusVideo, blobToBase64 } from '../services/geminiService';

type Mode = 'image' | 'video';

const PRESETS = [
    { label: '360° Panorama', prompt: 'in a 360 degree equirectangular panorama projection style, high detail' },
    { label: 'Cyberpunk Future', prompt: 'in a futuristic cyberpunk style with neon lights and flying cars' },
    { label: 'Historic', prompt: 'in a vintage 19th century historic photography style' },
    { label: 'Winter Wonderland', prompt: 'covered in heavy snow, winter season, cozy atmosphere' },
    { label: 'Blueprint', prompt: 'as an architectural blueprint sketch' }
];

const MagicCampus: React.FC = () => {
  const [mode, setMode] = useState<Mode>('image');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Image Generation State
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  
  // Video Generation State
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [videoPrompt, setVideoPrompt] = useState('');
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await blobToBase64(file);
        setSelectedImage(`data:${file.type};base64,${base64}`);
        // Reset outputs when new input is selected
        setGeneratedImage(null);
        setGeneratedVideo(null);
        setError(null);
      } catch (err) {
        setError({ title: 'Upload Failed', message: 'Failed to process the uploaded image. Please try another file.' });
      }
    }
  };

  const ensureApiKey = async () => {
      // Check for Google AI Studio Key Selection environment
      if ((window as any).aistudio) {
          try {
              const hasKey = await (window as any).aistudio.hasSelectedApiKey();
              if (!hasKey) {
                  await (window as any).aistudio.openSelectKey();
                  // Assume success as per guide, but catch if user cancels/fails
              }
          } catch (e) {
              console.error("API Key selection error:", e);
              throw new Error("API Key selection process was interrupted or failed.");
          }
      }
  };

  const handleApiError = (err: any, type: 'image' | 'video') => {
    console.error(`MagicCampus ${type} error:`, err);
    let title = "Generation Failed";
    let msg = "An unexpected error occurred. Please try again.";
    
    if (err instanceof Error) {
        const rawMsg = err.message || "";
        
        // 1. Network / Offline
        if (!navigator.onLine) {
             title = "No Internet Connection";
             msg = "Please check your network connection and try again.";
        }
        // 2. Auth / API Key
        else if (rawMsg.includes("403") || rawMsg.includes("API key") || rawMsg.includes("PERMISSION_DENIED")) {
            title = "Authentication Error";
            msg = type === 'video' 
                ? "Access denied. Video generation requires a paid API key. Please ensure you have selected a valid key associated with a billing-enabled project."
                : "Access denied. Please check your API key configuration.";
        } 
        // 3. Quota / Limits
        else if (rawMsg.includes("429") || rawMsg.includes("quota") || rawMsg.includes("exhausted")) {
             title = "Usage Limit Reached";
             msg = "You have reached the usage limit for the API. Please wait a minute before trying again.";
        } 
        // 4. Server / Overload
        else if (rawMsg.includes("503") || rawMsg.includes("overloaded") || rawMsg.includes("unavailable")) {
             title = "Service Busy";
             msg = "The AI service is currently experiencing high traffic. Please try again in a few moments.";
        } 
        // 5. Content Safety
        else if (rawMsg.includes("SAFETY") || rawMsg.includes("blocked") || rawMsg.includes("safety") || rawMsg.includes("finishReason")) {
             title = "Content Filtered";
             msg = "The generation was blocked by safety guidelines. Please try a different, more neutral prompt or image.";
        } 
        // 6. Session / Entity Not Found (Veo specific usually)
        else if (rawMsg.includes("Requested entity was not found") || rawMsg.includes("404")) {
             title = "Session Expired";
             msg = "Your API key session may have expired. Please refresh the page to re-select your key.";
        } 
        // 7. Bad Request / Invalid Args
        else if (rawMsg.includes("400") || rawMsg.includes("INVALID_ARGUMENT") || rawMsg.includes("valid")) {
            title = "Invalid Input";
            msg = "The input provided was invalid. Please check your prompt or ensure the image format is supported (JPEG/PNG).";
        } 
        // 8. Generic fallback with meaningful message
        else if (rawMsg.length > 0 && rawMsg.length < 200) {
            msg = `Error details: ${rawMsg}`;
        }
    }
    
    setError({ title, message: msg });
  };

  const handleImageGenerate = async () => {
    if (!selectedImage || !imagePrompt.trim()) return;

    setIsImageLoading(true);
    setError(null);
    try {
      const base64Content = selectedImage.split(',')[1];
      const result = await editImageWithGemini(base64Content, imagePrompt);
      
      if (result) {
        setGeneratedImage(result);
      } else {
        setError({ title: "Generation Incomplete", message: "The AI processed the request but returned no image. This might happen if the safety filters blocked the output or the model couldn't interpret the instructions." });
      }
    } catch (err) {
      handleApiError(err, 'image');
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleVideoGenerate = async () => {
    if (!videoPrompt.trim()) return;

    setIsVideoLoading(true);
    setError(null);
    
    try {
        await ensureApiKey();
        
        let startImageBase64 = undefined;
        let mimeType = 'image/jpeg';
        
        if (selectedImage) {
            const parts = selectedImage.split(',');
            startImageBase64 = parts[1];
            mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
        }

        const resultUrl = await generateCampusVideo(videoPrompt, startImageBase64, mimeType);
        
        if (resultUrl) {
            setGeneratedVideo(resultUrl);
        } else {
            setError({ title: "Video Generation Failed", message: "The service did not return a valid video. This may happen due to high demand or complex prompts. Please try again." });
        }
    } catch (err) {
        handleApiError(err, 'video');
    } finally {
        setIsVideoLoading(false);
    }
  };

  const applyPreset = (presetPrompt: string) => {
      const separator = imagePrompt.length > 0 ? ', ' : '';
      setImagePrompt(prev => prev + separator + presetPrompt);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Magic Campus Studio</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transform your campus photos into stunning visualizations or generate immersive virtual tours using AI.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex">
            <button
                onClick={() => setMode('image')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                    mode === 'image' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
                📸 Image Enhancer
            </button>
            <button
                onClick={() => setMode('video')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                    mode === 'video' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
                🎥 Virtual Tour (Beta)
            </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Left Column: Input */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
            <h3 className="font-semibold text-lg mb-4 text-gray-700">
                1. {mode === 'image' ? 'Upload & Enhance' : 'Setup Tour'}
            </h3>
            
            {/* Image Upload Area */}
            <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full min-h-[200px] border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition-colors relative overflow-hidden group mb-4 ${
                    selectedImage ? 'border-indigo-200 bg-indigo-50/30' : 'border-gray-300 hover:bg-gray-50'
                }`}
            >
                {selectedImage ? (
                    <img src={selectedImage} alt="Input" className="w-full h-full object-contain absolute inset-0 max-h-[300px]" />
                ) : (
                    <div className="text-center p-4">
                        <span className="text-4xl mb-2 block">
                            {mode === 'image' ? '🖼️' : '🎬'}
                        </span>
                        <span className="text-gray-500 font-medium">
                            {mode === 'image' ? 'Upload Campus Photo' : 'Upload Start Frame (Optional)'}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">Change Image</span>
                </div>
            </div>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
            />

            {/* Prompt Inputs */}
            {mode === 'image' ? (
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Enhancement Details</label>
                    <textarea
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="E.g., Make it look like a watercolor painting, Add more students..."
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-24"
                    />
                    
                    {/* Presets */}
                    <div className="flex flex-wrap gap-2">
                        {PRESETS.map((preset) => (
                            <button
                                key={preset.label}
                                onClick={() => applyPreset(preset.prompt)}
                                className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-full transition-colors border border-gray-200"
                            >
                                + {preset.label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleImageGenerate}
                        disabled={!selectedImage || !imagePrompt || isImageLoading}
                        className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-md ${
                            !selectedImage || !imagePrompt || isImageLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                        {isImageLoading ? 'Enhancing...' : 'Generate Visualization'}
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Tour Description</label>
                    <textarea
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                        placeholder="E.g., A cinematic drone shot flying over the university library at sunset..."
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-24"
                    />
                     <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-xs text-yellow-800">
                        <strong>Note:</strong> Video generation requires a paid API key. You will be asked to select one.
                    </div>
                    <button
                        onClick={handleVideoGenerate}
                        disabled={!videoPrompt || isVideoLoading}
                        className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-md ${
                            !videoPrompt || isVideoLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                        {isVideoLoading ? 'Generating Video (may take 1 min)...' : 'Start Virtual Tour'}
                    </button>
                </div>
            )}
            
            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-fade-in shadow-sm">
                    <div className="bg-red-100 p-2 rounded-full text-red-600 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-red-800">{error.title}</h4>
                        <p className="text-sm text-red-700 mt-1 leading-relaxed">{error.message}</p>
                        {error.title === "Session Expired" && (
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-2 text-xs font-bold text-red-700 underline hover:text-red-900"
                            >
                                Refresh Page
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>

        {/* Right Column: Output */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
            <h3 className="font-semibold text-lg mb-4 text-gray-700">2. Result</h3>
            <div className="flex-grow min-h-[300px] bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200 overflow-hidden relative">
                
                {mode === 'image' && generatedImage && (
                    <div className="relative w-full h-full group">
                        <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                        <a 
                            href={generatedImage} 
                            download="magic-campus.png"
                            className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white text-indigo-600 z-10"
                            title="Download"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        </a>
                    </div>
                )}

                {mode === 'video' && generatedVideo && (
                    <div className="relative w-full h-full">
                         <video 
                            src={generatedVideo} 
                            controls 
                            autoPlay 
                            loop 
                            className="w-full h-full object-contain"
                         />
                         <a 
                            href={generatedVideo} 
                            download="virtual-tour.mp4"
                            className="absolute bottom-12 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white text-indigo-600 z-10"
                            title="Download Video"
                         >
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                         </a>
                    </div>
                )}

                {((mode === 'image' && !generatedImage) || (mode === 'video' && !generatedVideo)) && (
                    <div className="text-center text-gray-400 p-8">
                        {isImageLoading || isVideoLoading ? (
                             <div className="flex flex-col items-center">
                                <svg className="animate-spin h-10 w-10 text-indigo-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="animate-pulse">Creating Magic...</p>
                             </div>
                        ) : (
                            <>
                                <span className="text-5xl block mb-3 opacity-50">✨</span>
                                <p>Your {mode === 'image' ? 'visualization' : 'tour'} will appear here.</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MagicCampus;
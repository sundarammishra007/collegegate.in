import { GoogleGenAI } from "@google/genai";

// Helper to convert Blob to Base64
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const editImageWithGemini = async (
  imageBase64: string,
  prompt: string,
  mimeType: string = 'image/jpeg'
): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using Nano Banana (gemini-2.5-flash-image) for image editing
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      // Note: No specific config needed for simple edits unless asking for JSON etc.
    });

    // Iterate to find image part
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    console.warn("No image data found in response");
    return null;

  } catch (error) {
    console.error("Error editing image:", error);
    throw error;
  }
};

export const generateCampusVideo = async (
  prompt: string,
  startImageBase64?: string,
  mimeType: string = 'image/jpeg'
): Promise<string | null> => {
  try {
    // Re-initialize to ensure fresh key if selected via UI
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    let operation;
    const config = {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
    };

    if (startImageBase64) {
         operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            image: {
                imageBytes: startImageBase64,
                mimeType: mimeType
            },
            config: config
        });
    } else {
        operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: config
        });
    }

    // Polling loop
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5s poll
        operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (videoUri) {
        // Fetch the actual video bytes using the key
        const videoResponse = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
        const blob = await videoResponse.blob();
        return URL.createObjectURL(blob);
    }
    
    return null;
  } catch (error) {
    console.error("Video generation error:", error);
    throw error;
  }
};
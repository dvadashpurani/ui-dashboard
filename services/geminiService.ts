
import { GoogleGenAI } from "@google/genai";
import { DictationSession } from "../types";

export const getDictationInsight = async (sessions: DictationSession[]) => {
  // Always use process.env.API_KEY directly for initialization as per guidelines.
  // Assume this variable is pre-configured and valid.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const totalWords = sessions.reduce((acc, s) => acc + s.wordCount, 0);
  const totalHours = sessions.reduce((acc, s) => acc + s.duration, 0) / 3600;
  
  const prompt = `
    Analyze these dictation statistics for a user of 'Glaido' (a pro speech-to-text tool):
    - Total Sessions: ${sessions.length}
    - Total Words: ${totalWords}
    - Time Dictating: ${totalHours.toFixed(2)} hours
    - Typical Apps: ${Array.from(new Set(sessions.map(s => s.app))).join(", ")}

    Provide a concise, professional 2-sentence productivity insight. 
    Focus on how much typing time was likely saved (assume dictation is 3x faster than typing).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    // Use .text property directly to access generated text content as per guidelines.
    return response.text || "Unable to generate insight at this time.";
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Error connecting to AI service.";
  }
};
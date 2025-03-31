import { GoogleGenAI } from "@google/genai";

// Generating an instance of the AI with an API key
const googleAi = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY });

export class Assistant {
    async chat(content) {
        // "content" is the user message from the input form
        try {
            const response = await googleAi.models.generateContent({
                model: "gemini-2.0-flash",
                contents: content,
            });

            return response;
        } catch (error) {
            throw error;
        };
    };
}
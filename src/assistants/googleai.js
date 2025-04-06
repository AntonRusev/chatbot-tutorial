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

    // Generator function to stream the response from the AI
    async *chatStream(content) {
        // "content" is the user message from the input form
        try {
            const response = await googleAi.models.generateContentStream({
                model: "gemini-2.0-flash",
                contents: content,
            });

            // The response is a ReadableStream, so we can use a for await loop to read the chunks and yield them one by one
            for await (const chunk of response) {
                yield chunk.text;
            };
        } catch (error) {
            throw error;
        };
    };
}
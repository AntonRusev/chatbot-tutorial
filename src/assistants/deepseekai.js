import OpenAI from "openai";

// Generating an instance of OpenAI with an API Key
const openAi = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: import.meta.env.VITE_DEEPSEEK_AI_API_KEY,
    dangerouslyAllowBrowser: true, // Required in order to be able to send the API Key from the frontend
});

export class Assistant {
    async chat(content, history) {
        // "content" is the user message from the input form
        // "history" is the entire chat history, it is required for Open AI, as opposite to Google AI, it does not keep track of it at the backend
        try {
            const response = await openAi.responses.create({
                model: "deepseek-chat",
                input: [...history, { content, role: 'user' }]
            });

            return response;
        } catch (error) {
            throw error;
        };
    };

    // Generator function to stream the response from the AI
    async *chatStream(content, history) {
        // "content" is the user message from the input form
        // "history" is the entire chat history, it is required for Open AI, as opposite to Google AI, it does not keep track of it at the backend
        try {
            const response = await openAi.responses.create({
                model: "gpt-4o",
                input: [...history, { content, role: 'user' }],
                stream: true,
            });

            // The response is a ReadableStream, so we can use a for await loop to read the chunks and yield them one by one
            for await (const chunk of response) {
                const text = chunk.delta;
                if (text) {
                    yield text; // this yields only the text string to the browser
                };
            };
        } catch (error) {
            throw error;
        };
    };
};
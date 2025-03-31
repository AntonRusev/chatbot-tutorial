import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";

// Generating an instance of the AI with an API key
const googleAi = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY });


function App() {
  const [messages, setMessages] = useState([]);

  // Adding message to the conversation
  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  async function handleContentSend(content) {
    addMessage({ content, role: "user" }); // Adding user's input text message to the conversation
    try {
      const response = await googleAi.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
      });

      addMessage({ content: response.text, role: "assistant" }); // Adding the text response to the conversation
    } catch (error) {
      addMessage({ content: "Sorry, I couldn't process your request. Please try again.", role: "system" }); // TODO add a new "system" role alongside "user" and "assistant"
    };
  };

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        {/* Image */}
        <img
          className={styles.Logo}
          src="/chat-bot.png"
          alt="bot"
        />
        {/* Title */}
        <h2 className={styles.Title}>Chatbot</h2>
      </header>

      {/* Chat container */}
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>

      {/* Controls - TextArea + Submit Button */}
      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;
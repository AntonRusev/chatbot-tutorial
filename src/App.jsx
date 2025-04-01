import { useState } from "react";

// Have only one Assistant active at a time:

// import { Assistant } from "./assistants/googleai";
import { Assistant } from "./assistants/openai";

import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";

function App() {
  const [messages, setMessages] = useState([]);

  // Generating an instance of the Assistant class
  const assistant = new Assistant();

  // Adding message to the conversation
  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  async function handleContentSend(content) {
    // "content" is the user message from the input form
    addMessage({ content, role: "user" }); // Adding user's input text message to the conversation

    try {
      const result = await assistant.chat(content, messages);

      // addMessage({ content: result.text, role: "assistant" }); // Adding the text response to the conversation (GOOGLE AI)
      addMessage({ content: result.output_text, role: "assistant" }); // Adding the text response to the conversation (OPEN AI)
    } catch (error) {
      addMessage({ content: "Sorry, we encountered an error while processing your request. Please try again later.", role: "system" }); // TODO add a new "system" role alongside "user" and "assistant"
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
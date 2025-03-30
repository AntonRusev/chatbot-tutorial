import { useState } from "react";

import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";

function App() {
  const [messages, setMessages] = useState([]);

  function handleContentSend(content) {
    setMessages((prevMessages) => [...prevMessages, { content, role: 'user' }]);
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
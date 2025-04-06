import { useState } from "react";

// Have only one Assistant active at a time:
// import { Assistant } from "./assistants/googleai";
import { Assistant } from "./assistants/openai";

import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import { Loader } from "./components/Loader/Loader";

import styles from "./App.module.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  function updateLastMessageContent(content) {
    setMessages((prevMessages) => (
      prevMessages.map((message, index) => {
        // Checking the if the message is the last one
        if (index === prevMessages.length - 1) {
          return ({
            ...message,
            content: `${message.content}${content}`, // Updating the last message content
          });
        } else {
          return message; // Returning the other messages unchanged
        };
      })
    ));
  };

  // Generating an instance of the Assistant class
  const assistant = new Assistant();

  // Adding message to the conversation
  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  async function handleContentSend(content) {
    // "content" is the user message from the input form
    addMessage({ content, role: "user" }); // Adding user's input text message to the conversation
    setIsLoading(true); // Trigger the Loader

    try {
      // const result = await assistant.chat(content, messages);
      const result = assistant.chatStream(content, messages); // Streaming the response from the AI
      let isFirstChunk = false; // for disabling the IsLOading state

      // addMessage({ content: result.text, role: "assistant" }); // Adding the text response to the conversation (GOOGLE AI)
      // addMessage({ content: result.output_text, role: "assistant" }); // Adding the text response to the conversation (OPEN AI)

      for await (const chunk of result) {
        if (!isFirstChunk) {
          // if this is the first chunk, generate a new assistant message and disable the Loader
          isFirstChunk = true;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStreaming(true); // Triggering the streaming state (to be used by the Loader as an alternative to IsLoading)
        };

        updateLastMessageContent(chunk); // Updating the last assistant message content with the streamed chunk
      };

      setIsStreaming(false); // Disabling the streaming state
    } catch (error) {
      addMessage({ content: "Sorry, we encountered an error while processing your request. Please try again later.", role: "system" }); // TODO add a new "system" role alongside "user" and "assistant"

      setIsLoading(false); // Clear the Loader
      setIsStreaming(false); // Disabling the streaming state
    };
  };

  return (
    <div className={styles.App}>
      {/* Loader */}
      {isLoading && <Loader />}

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
      <Controls
        isDisabled={isLoading || isStreaming}
        onSend={handleContentSend}
      />
    </div>
  );
}

export default App;
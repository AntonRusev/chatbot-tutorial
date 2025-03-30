import { useState } from 'react';

import styles from './Controls.module.css'

export function Controls({ onSend }) {
    const [content, setContent] = useState("");

    function handleContentChange(e) {
        setContent(e.target.value);
    };

    function handleContentSend() {
        if (content.length > 0) {
            onSend(content);
            setContent("")
        };
    };

    // Sending the message by pressing the Enter key
    function handleEnterPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleContentSend();
        };
    };

    return (
        <div className={styles.Controls}>
            <div className={styles.TextAreaContainer}>
                {/* Text Area */}
                <textarea
                    className={styles.TextArea}
                    placeholder="Write Message Here"
                    value={content}
                    onChange={handleContentChange}
                    onKeyDown={handleEnterPress}
                />
            </div>

            {/* Send Button */}
            <button
                className={styles.Button}
                onClick={handleContentSend}
            >
                <SendIcon />
            </button>
        </div>
    );
}

function SendIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
        </svg>
    );
}
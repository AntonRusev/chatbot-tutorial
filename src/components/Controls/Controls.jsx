import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './Controls.module.css'

export function Controls({ isDisabled = false, onSend }) {
    const [content, setContent] = useState("");

    const textareaRef = useRef(null);

    useEffect(() => {
        if (!isDisabled) {
            textareaRef.current.focus(); // Focus on the textarea when it is enabled (Autofocus after chatbot responses)
        };
    }, [isDisabled])

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
                <TextareaAutosize
                    className={styles.TextArea}
                    ref={textareaRef}
                    disabled={isDisabled}
                    placeholder="Write Message Here"
                    value={content}
                    minRows={1}
                    maxRows={5}
                    onChange={handleContentChange}
                    onKeyDown={handleEnterPress}
                />
            </div>

            {/* Send Button */}
            <button
                className={styles.Button}
                disabled={isDisabled}
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
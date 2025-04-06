import { useEffect, useMemo, useRef } from 'react';
import Markdown from 'react-markdown';

import styles from "./Chat.module.css";

const WELCOME_MESSAGE_GROUP = [{
    role: 'assistant',
    content: 'Hello! How can I assist you right now?'
}];

export function Chat({ messages }) {
    const messagesEndRef = useRef(null);

    const messagesGroups = useMemo(() => (
        messages.reduce((groups, message) => {
            // Generate a new memoized group for each new user message
            if (message.role === 'user') {
                groups.push([]);
            };
            groups[groups.length - 1].push(message); // Add the user message to the last group

            return groups;
        }, [])
    ), [messages]);

    useEffect(() => {
        const lastMessage = messages[messages.length - 1]; // Getting the last message

        if (lastMessage?.role === 'user') {
            // Scroll only if the last message is from the user
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };
    }, [messages]);

    return (
        <div className={styles.Chat}>
            {/* Messages in groups, always in pairs- user + assistant(AI) */}
            {[WELCOME_MESSAGE_GROUP, ...messagesGroups].map((messages, groupIndex) => {
                return (
                    <div key={groupIndex} className={styles.Group}>
                        {/* Individual messages by either user or assistant(AI) */}
                        {messages.map(({ role, content }, index) => (
                            <div
                                key={index}
                                className={styles.Message}
                                data-role={role}
                            >
                                {/* Component for rendering markdown language */}
                                <Markdown>
                                    {content}
                                </Markdown>
                            </div>
                        ))}
                    </div>
                );
            })}


            {/* Empty div to scroll to the bottom of the chat */}
            {/* This div is used to scroll to the bottom of the chat when new messages are added */}
            {/* It is not visible in the UI */}
            <div ref={messagesEndRef} />
        </div>
    );
}
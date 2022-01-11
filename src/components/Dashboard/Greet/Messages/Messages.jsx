import React from "react";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";

import "./Message.scss";

const Messages = ({ disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [messages, setMessages] = React.useState(greetConfig?.messages || []);

    // Sync greet messages
    React.useEffect(() => {
        setMessages(greetConfig?.messages || []);
    }, [greetConfig]);

    // TODO: save messages, backend call

    return (
        <>
            <div className="greet-full-container">
                <p className="greet-title">Greet Messages:</p>
                <div className="greet-content">
                    <p>
                        Bot will send a random message from when someone will
                        boost the server. You can add upto 10 messages with
                        premium and 3 messages with free.
                    </p>
                    {messages.map((message, index) => (
                        <div className="greet-pair" key={index}>
                            <textarea
                                className="greet-message-input"
                                type="text-box"
                                placeholder="Message"
                                value={message}
                                onChange={(e) => {
                                    const newMessages = [...messages];
                                    newMessages[index] = e.target.value;
                                    setMessages(newMessages);
                                }}
                            />
                            <ImCross
                                disabled={disableButton}
                                onClick={() => {
                                    const newMessages = [...messages];
                                    newMessages.splice(index, 1);
                                    setMessages(newMessages);
                                }}
                                className="greet-clear"
                            />
                        </div>
                    ))}
                    {/* button to add message */}
                    <div className="greet-pair">
                        {!messages.length && (
                            <p className="greet-content">
                                <b>Greet Messages are disabled.</b>
                            </p>
                        )}
                        <div className="greet-message-input-wrapper-buttons">
                            <button
                                disabled={disableButton}
                                onClick={() => {
                                    const newMessages = [...messages];
                                    newMessages.push("");
                                    setMessages(newMessages);
                                }}
                                className="greet-message-input-wrapper-buttons-button"
                            >
                                Add Message
                            </button>
                            <button
                                disabled={disableButton}
                                onClick={() => {
                                    const newMessages = [...messages];
                                    newMessages.push("");
                                    setMessages(newMessages);
                                }}
                                className="greet-message-input-wrapper-buttons-button"
                            >
                                Save Messages
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messages;

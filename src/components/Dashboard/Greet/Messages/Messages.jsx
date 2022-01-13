import React from "react";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./Message.scss";

const Messages = ({ disableButton, setDisableButton }) => {
    const guildConfig = useSelector((state) => state.guild.dbGeneralConfig);
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [messages, setMessages] = React.useState(greetConfig?.messages || []);
    const [isPremium, setIsPremium] = React.useState(
        guildConfig?.premium || false
    );

    // Sync greet messages
    React.useEffect(() => {
        setMessages(greetConfig?.messages || []);
    }, [greetConfig]);

    // Sync premium status
    React.useEffect(() => {
        setIsPremium(guildConfig?.premium || false);
    }, [guildConfig]);

    // message add handling
    const handleMessageAdd = () => {
        if (isPremium && messages.length >= 10) {
            toast.error("You can only have 10 messages.");
            return;
        } else if (!isPremium && messages.length >= 2) {
            toast.error("Only 2 messages allowed for non premium server.");
            return;
        }
        const newMessages = [...messages];
        newMessages.push("");
        setMessages(newMessages);
    };

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
                                maxLength={2000}
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
                                onClick={handleMessageAdd}
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

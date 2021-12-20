import React from "react";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "./Message.scss";

const Messages = ({ disableButton, setDisableButton }) => {
    const dispatch = useDispatch();
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const toastId = React.useRef(null);
    const [greetDisabled, setGreetDisabled] = React.useState(true);

    const [messages, setMessages] = React.useState(greetConfig?.messages || []);

    // Sync greet messages
    React.useEffect(() => {
        setMessages(greetConfig?.messages || []);
    }, [greetConfig]);

    return (
        <>
            <div className="greet-std-container">
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
                        <button
                            disabled={disableButton}
                            onClick={() => {
                                const newMessages = [...messages];
                                newMessages.push("");
                                setMessages(newMessages);
                            }}
                            className="greet-apply"
                        >
                            Add Message
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messages;

import React from "react";
import { useSelector } from "react-redux";

import "../Embed.scss";

const Author = ({ disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [isDisabled, setIsDisabled] = React.useState(
        greetConfig?.author ? false : true
    );
    const [author, setAuthor] = React.useState(greetConfig?.author || null);

    // Sync greet images
    React.useEffect(() => {
        setAuthor(greetConfig?.author || null);
        setIsDisabled(greetConfig?.author ? false : true);
    }, [greetConfig]);

    // handle author toggle
    const handleAuthorToggle = () => {
        if (isDisabled) {
            setAuthor("");
        } else {
            setAuthor(null);
        }
        setIsDisabled(!isDisabled);
    };

    // handle author save
    const handleAuthorSave = () => {
        setDisableButton(true);

        // TODO: backend call to save author

        setDisableButton(false);
    };

    return (
        <>
            <div className="greet-std-container">
                <p className="greet-title">Author Text</p>
                {!isDisabled ? (
                    <p className="greet-content">
                        Feel free to use <b>bb vars</b> in this field. <br />
                        Bot will set this text in greet embed author field.
                    </p>
                ) : (
                    <p className="greet-content">
                        <b>There will be no author and author icon</b>
                        <br />
                        Enable now to set author name and icon in greet embed.
                    </p>
                )}
                <div className="greet-pair">
                    {!isDisabled && (
                        <textarea
                            className="greet-message-input"
                            type="text-box"
                            placeholder="Message"
                            value={author}
                            onChange={(e) => {
                                const newAddonMsg = e.target.value;
                                setAuthor(newAddonMsg);
                            }}
                            maxLength={1000}
                        />
                    )}
                </div>

                {/* Save Button */}
                <div className="greet-pair">
                    <button
                        className="greet-apply"
                        onClick={handleAuthorToggle}
                        disabled={disableButton}
                    >
                        {isDisabled ? "Enable" : "Disable"}
                    </button>
                    <button
                        className="greet-apply"
                        onClick={handleAuthorSave}
                        disabled={disableButton}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default Author;

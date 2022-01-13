import React from "react";

import "../Embed.scss";

function Text({
    isDisabled = false,
    text,
    setText,
    handleTextSave,
    handleTextToggle,
    disableButton = false,
}) {
    return (
        <>
            {/* INPUT FIELD */}
            <div className="greet-pair">
                {!isDisabled && (
                    <textarea
                        className="greet-message-input"
                        type="text-box"
                        placeholder="Message"
                        value={text}
                        onChange={(e) => {
                            const newAddonMsg = e.target.value;
                            setText(newAddonMsg);
                        }}
                        maxLength={1000}
                    />
                )}
            </div>

            {/* Save Button */}
            <div className="greet-pair">
                <button
                    className="greet-apply"
                    onClick={handleTextToggle}
                    disabled={disableButton}
                >
                    {isDisabled ? "Enable" : "Disable"}
                </button>
                <button
                    className="greet-apply"
                    onClick={handleTextSave}
                    disabled={disableButton}
                >
                    Save
                </button>
            </div>
        </>
    );
}

export default Text;

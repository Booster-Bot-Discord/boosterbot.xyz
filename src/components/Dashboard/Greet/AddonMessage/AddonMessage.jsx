import React from "react";
import { useSelector } from "react-redux";

const AddonMessages = ({ disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [isDisabled, setIsDisabled] = React.useState(
        greetConfig?.addon ? false : true
    );
    const [addonMsg, setAddonMsg] = React.useState(greetConfig?.addon || null);

    // Sync greet addon messages
    React.useEffect(() => {
        setAddonMsg(greetConfig?.addon || null);
        setIsDisabled(greetConfig?.addon ? false : true);
    }, [greetConfig]);

    // handle addon toggle
    const handleAddonToggle = () => {
        if (isDisabled) {
            setAddonMsg("");
        } else {
            setAddonMsg(null);
        }
        setIsDisabled(!isDisabled);
    };

    // TODO: save addon messages, backend call
    const handleAddonSave = () => {
        setDisableButton(true);
        setTimeout(() => {
            setDisableButton(false);
        }, 3000);
    };

    return (
        <>
            <div className="greet-full-container">
                <p className="greet-title">Addon Messages:</p>
                <div className="greet-content">
                    <p>
                        Bot will send plain message along/outside embed (only if
                        embed is enabled) to ping booster, any other user or
                        even any role.
                    </p>

                    <div className="greet-pair">
                        {!isDisabled && (
                            <textarea
                                className="greet-message-input"
                                type="text-box"
                                placeholder="Message"
                                value={addonMsg}
                                onChange={(e) => {
                                    const newAddonMsg = e.target.value;
                                    setAddonMsg(newAddonMsg);
                                }}
                                maxLength={2000}
                            />
                        )}
                    </div>

                    {/* button to add message */}
                    <div className="greet-pair">
                        {isDisabled && (
                            <p className="greet-content">
                                <b>Addon Messages is disabled.</b>
                            </p>
                        )}
                        <div className="greet-pair">
                            <button
                                className="greet-apply"
                                onClick={handleAddonToggle}
                                disabled={disableButton}
                            >
                                {isDisabled ? "Enable" : "Disable"}
                            </button>
                            <button
                                className="greet-apply"
                                onClick={handleAddonSave}
                                disabled={disableButton}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddonMessages;

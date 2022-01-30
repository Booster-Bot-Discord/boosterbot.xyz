import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUpdatedConfig } from "../../../utilities/changeConfig";

import "../Greet.scss";

const IsEmbed = ({
    toastId,
    updateConfig,
    disableButton,
    setDisableButton,
}) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [isEmbed, setIsEmbed] = React.useState(greetConfig?.isEmbed || false);

    // Sync is embed
    React.useEffect(() => {
        setIsEmbed(greetConfig?.isEmbed || false);
    }, [greetConfig]);

    // handle is embed toggle
    const handleIsEmbedToggle = () => {
        setIsEmbed(!isEmbed);
    };

    // handle is embed save
    const handleIsEmbedSave = async () => {
        if (isEmbed === greetConfig?.isEmbed) {
            return toast.warn(
                `Is Embed is already ${isEmbed ? "enabled" : "disabled"}`
            );
        }
        setDisableButton(true);
        toastId.current = toast.info(
            `${isEmbed ? "Enabling" : "Disabling"} embed`,
            {
                autoClose: false,
            }
        );
        updateConfig(
            getUpdatedConfig(greetConfig, { isEmbed: isEmbed }),
            `${isEmbed ? "Enabled" : "Disabled"} embed`
        );
    };

    return (
        <>
            <div className="greet-std-container">
                <p className="greet-title">Embed</p>
                {!isEmbed ? (
                    <p className="greet-content">
                        Enable if you want your greet message to be wrapped in
                        an embed. <br />
                        You get extra configs like color, thumbnail, footer,
                        author, etc.
                    </p>
                ) : (
                    <p className="greet-content">
                        <b>Bot will send greet message in embed.</b>
                        <br />
                        Unlocked embed color, author, icon, footer and many more
                        configs.
                    </p>
                )}

                {/* Save Button */}
                <div className="greet-pair">
                    <button
                        className="greet-apply"
                        onClick={handleIsEmbedToggle}
                        disabled={disableButton}
                    >
                        {isEmbed ? "Disable" : "Enable"}
                    </button>
                    <button
                        className="greet-apply"
                        onClick={handleIsEmbedSave}
                        disabled={disableButton}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default IsEmbed;

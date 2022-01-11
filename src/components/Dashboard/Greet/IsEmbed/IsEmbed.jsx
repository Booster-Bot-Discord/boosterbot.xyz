import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "../Greet.scss";

const IsEmbed = ({ disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const toastId = React.useRef(null);
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
        setDisableButton(true);
        toastId.current = toast.info("Saving...", {
            type: "info",
            autoClose: false,
        });

        // TODO: Save is embed, backend call
        setTimeout(() => {
            toast.update(toastId.current, {
                render: "Saved!",
                type: toast.TYPE.SUCCESS,
                autoClose: 5000,
            });
        }, 3000);
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

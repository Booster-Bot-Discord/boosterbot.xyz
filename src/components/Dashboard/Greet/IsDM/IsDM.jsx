import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUpdatedConfig } from "../../../utilities/changeConfig";

import "../Greet.scss";

const IsDM = ({ toastId, updateConfig, disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [isDM, setIsDM] = React.useState(greetConfig?.dm || false);

    // Sync is dm
    React.useEffect(() => {
        setIsDM(greetConfig?.dm || false);
    }, [greetConfig]);

    // handle is dm toggle
    const handleIsDMToggle = () => {
        setIsDM(!isDM);
    };

    // handle is dm save
    const handleIsDMSave = async () => {
        if (isDM === greetConfig?.dm) {
            return toast.warn(
                `Is DM is already ${isDM ? "enabled" : "disabled"}`
            );
        }
        setDisableButton(true);
        toastId.current = toast.info(
            `${isDM ? "Enabling" : "Disabling"} DM message`,
            {
                autoClose: false,
            }
        );
        updateConfig(
            getUpdatedConfig(greetConfig, { dm: isDM }),
            `${isDM ? "Enabled" : "Disabled"} DM message`
        );
    };

    return (
        <>
            <div className="greet-std-container">
                <p className="greet-title">Greet DM</p>
                {!isDM ? (
                    <p className="greet-content">
                        Enable if you want greet message in DM of server
                        booster.
                    </p>
                ) : (
                    <p className="greet-content">
                        <b>Greet Messages will not be sent in any channel!</b>
                        <br />
                        Bot will send greet message in DM of server booster.
                    </p>
                )}

                {/* Save Button */}
                <div className="greet-pair">
                    <button
                        className="greet-apply"
                        onClick={handleIsDMToggle}
                        disabled={disableButton}
                    >
                        {isDM ? "Disable" : "Enable"}
                    </button>
                    <button
                        className="greet-apply"
                        onClick={handleIsDMSave}
                        disabled={disableButton}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default IsDM;

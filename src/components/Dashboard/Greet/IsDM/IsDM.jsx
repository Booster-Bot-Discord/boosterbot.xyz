import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "../Greet.scss";

const IsDM = ({ disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const toastId = React.useRef(null);
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
        setDisableButton(true);
        toastId.current = toast.info("Saving...", {
            type: "info",
            autoClose: false,
        });

        // TODO: Save is dm, backend call
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

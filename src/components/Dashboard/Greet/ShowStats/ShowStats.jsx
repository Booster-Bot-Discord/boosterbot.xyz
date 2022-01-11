import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "../Greet.scss";

const ShowStats = ({ disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const toastId = React.useRef(null);
    const [stats, setStats] = React.useState(greetConfig?.stats || false);

    // Sync is Stats
    React.useEffect(() => {
        setStats(greetConfig?.stats || false);
    }, [greetConfig]);

    // handle is Stats toggle
    const handleStatsToggle = () => {
        setStats(!stats);
    };

    // handle is Stats save
    const handleIsStatsSave = async () => {
        setDisableButton(true);
        toastId.current = toast.info("Saving...", {
            type: "info",
            autoClose: false,
        });

        // TODO: Save is Stats, backend call
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
                <p className="greet-title">Boost Stats</p>
                {!stats ? (
                    <p className="greet-content">
                        Enable if you want basic stats like total boosts and if
                        server achieved new boost level with boost message.
                    </p>
                ) : (
                    <p className="greet-content">
                        <b>Stats will be appended with greet message.</b>
                        <br />
                        Your server's name with total current boost count and
                        level will be shows with boost message.
                    </p>
                )}

                {/* Save Button */}
                <div className="greet-pair">
                    <button
                        className="greet-apply"
                        onClick={handleStatsToggle}
                        disabled={disableButton}
                    >
                        {stats ? "Disable" : "Enable"}
                    </button>
                    <button
                        className="greet-apply"
                        onClick={handleIsStatsSave}
                        disabled={disableButton}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default ShowStats;

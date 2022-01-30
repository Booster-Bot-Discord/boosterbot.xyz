import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUpdatedConfig } from "../../../utilities/changeConfig";

import "../Greet.scss";

const ShowStats = ({
    toastId,
    updateConfig,
    disableButton,
    setDisableButton,
}) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

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
        if (stats === greetConfig?.stats) {
            return toast.warn(
                `Stats is already ${stats ? "enabled" : "disabled"}`
            );
        }
        setDisableButton(true);
        toastId.current = toast.info(
            `${stats ? "Enabling" : "Disabling"} stats on greet msg.`,
            {
                autoClose: false,
            }
        );
        updateConfig(
            getUpdatedConfig(greetConfig, { stats: stats }),
            `${stats ? "Enabled" : "Disabled"} stats on greet msg.`
        );
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

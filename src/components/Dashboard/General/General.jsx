import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { updateGuildConfig, updateBotNickname } from "../../../api/index";

import "./General.scss";

function General() {
    const guildId = useSelector((state) => state.guild.discordId);
    const guildName = useSelector((state) => state.guild.name);
    const guildConfig = useSelector((state) => state.guild.dbGeneraConfig);
    const permissions = useSelector((state) => state.guild.permissions);

    const [prefixValue, setPrefixValue] = React.useState(
        guildConfig?.prefix || "bb"
    );
    const [nickname, setNickname] = React.useState("");

    const changePrefix = () => {
        if (prefixValue.length < 1 || prefixValue.length > 35) {
            return toast.error("Prefix length can be 1 to 35 characters long.");
        }
        updateGuildConfig(guildId, { prefix: prefixValue })
            .then(() => {
                toast.success(`Prefix updated to ${prefixValue}`);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const changeNickname = () => {
        if (nickname.length < 1 || nickname.length > 32) {
            return toast.error(
                "Nickname length can be 1 to 35 characters long."
            );
        }
        if (!permissions.CHANGE_NICKNAME) {
            return toast.error(
                "Bot don't have permission to change it's nickname."
            );
        }
        setNickname("");
        updateBotNickname(guildId, nickname)
            .then(() => {
                toast.success("Nickname changed.");
            })
            .catch((err) => {
                console.log(err, err.body);
                toast.error("Nickname can't be changed.");
            });
    };

    return (
        <>
            <div className="general">
                <h3 className="general-header">
                    {guildName} - General Settings
                </h3>

                <div className="general-content">
                    {/* BOT SETTINGS */}
                    <div className="general-content-container">
                        <h4 className="general-content-title">Bot Settings</h4>

                        {/* Prefix */}
                        <div className="bot-container">
                            <p className="bot-title">Prefix</p>
                            <div className="bot-pair">
                                <input
                                    className="bot-input"
                                    type="text"
                                    value={prefixValue}
                                    onChange={(e) =>
                                        setPrefixValue(e.target.value)
                                    }
                                    minLength="1"
                                    maxLength="35"
                                />
                                <button
                                    className="bot-button"
                                    onClick={changePrefix}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* Nickname */}
                        <div className="bot-container">
                            <p className="bot-title">Nickname</p>
                            <div className="bot-pair">
                                <input
                                    className="bot-input"
                                    type="text"
                                    value={nickname}
                                    placeholder="Enter new nickname"
                                    onChange={(e) =>
                                        setNickname(e.target.value)
                                    }
                                    minLength="1"
                                    maxLength="32"
                                />
                                <button
                                    className="bot-button"
                                    onClick={changeNickname}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* SERVER SETTINGS */}
                    <div className="general-content-container">
                        <h4 className="general-content-title">
                            Server Settings
                        </h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default General;

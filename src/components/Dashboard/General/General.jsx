import React from "react";
import { useSelector } from "react-redux";

import "./General.scss";

function General() {
    const guildName = useSelector((state) => state.guild.name);
    const guildConfig = useSelector((state) => state.guild.dbGeneraConfig);

    const [prefixValue, setPrefixValue] = React.useState(
        guildConfig?.prefix || "bb"
    );
    const [nickname, setNickname] = React.useState("");

    const changePrefix = () => {};

    const changeNickname = () => {};

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

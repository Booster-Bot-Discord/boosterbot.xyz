import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setDbGeneralConfig } from "../../../store/guildSlice";
import {
    updateGuildConfig,
    updateBotNickname,
    updateGuildSystemChannel,
} from "../../../api/index";

import Dropdown from "../../Dropdown/Dropdown";

import "./General.scss";

function General() {
    const dispatch = useDispatch();
    const guildId = useSelector((state) => state.guild.discordId);
    const guildName = useSelector((state) => state.guild.name);
    const guildChannels = useSelector((state) => state.guild.channels);
    const guildConfig = useSelector((state) => state.guild.dbGeneralConfig);
    const permissions = useSelector((state) => state.guild.permissions);

    const toastId = React.useRef(null);
    const [disableButton, setDisableButton] = React.useState(false);
    const [prefixValue, setPrefixValue] = React.useState(
        guildConfig?.prefix || "bb"
    );
    const [nickname, setNickname] = React.useState("");
    const [selectedChannel, setSelectedChannel] = React.useState(
        guildChannels?.find((c) => c.id === guildConfig?.systemChannel) ||
            "-- disabled --"
    );

    React.useEffect(() => {
        setSelectedChannel(
            guildChannels?.find((c) => c.id === guildConfig?.systemChannel) ||
                "-- disabled --"
        );
        setPrefixValue(guildConfig?.prefix || "bb");
    }, [guildConfig, guildChannels]);

    // reusable error handler
    const handleError = (error) => {
        toast.update(toastId.current, {
            render: error.message,
            type: toast.TYPE.ERROR,
            autoClose: 5000,
        });
        setDisableButton(false);
    };

    // hande prefix change apply
    const changePrefix = () => {
        if (prefixValue.length < 1 || prefixValue.length > 35) {
            return toast.warn("Prefix length can be 1 to 35 characters long.");
        }
        if (guildConfig.prefix === prefixValue) {
            return toast.warn("Prefix is already set to this value.");
        }
        setDisableButton(true);
        toastId.current = toast.info("Updating prefix...", {
            autoClose: false,
        });
        updateGuildConfig(guildId, { prefix: prefixValue })
            .then(() => {
                dispatch(
                    setDbGeneralConfig({ ...guildConfig, prefix: prefixValue })
                );
                toast.update(toastId.current, {
                    render: "Prefix updated!",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 5000,
                });
                setDisableButton(false);
            })
            .catch((err) => handleError(err));
    };

    // handle change nickname apply
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
        setDisableButton(true);
        setNickname("");
        toastId.current = toast.info("Changing Nickname...", {
            autoClose: false,
        });
        updateBotNickname(guildId, nickname)
            .then(() => {
                toast.update(toastId.current, {
                    render: "Prefix updated!",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 5000,
                });
                setDisableButton(false);
            })
            .catch((err) => handleError(err));
    };

    // handle change system channel apply
    const changeSystemChannel = () => {
        if (!permissions.MANAGE_GUILD) {
            return toast.warn(
                "Bot don not have permission to MANAGE SERVER."
            );
        }
        if (selectedChannel === "-- disabled --") {
            return toast.warn("Please select a valid channel.");
        }
        if (guildConfig.systemChannel === selectedChannel.id) {
            return toast.warn(
                `System channel is already set to ${selectedChannel.name}`
            );
        }
        setDisableButton(true);
        toastId.current = toast.info("Changing System Channel...", {
            autoClose: false,
        });
        updateGuildSystemChannel(guildId, selectedChannel.id)
            .then(() => {
                dispatch(
                    setDbGeneralConfig({
                        ...guildConfig,
                        systemChannel: selectedChannel.id,
                    })
                );
                toast.update(toastId.current, {
                    render: "System Channel updated!",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 5000,
                });
                setDisableButton(false);
            })
            .catch((err) => handleError(err));
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
                                    disabled={disableButton}
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
                                    disabled={disableButton}
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
                        <div className="guild-container">
                            <p className="guild-title">System Channel</p>

                            <Dropdown
                                className="guild-dropdown"
                                selected={selectedChannel}
                                setSelected={setSelectedChannel}
                                items={guildChannels
                                    .filter((channel) => {
                                        return (
                                            channel.type === "GUILD_TEXT" ||
                                            channel.type === "GUILD_NEWS"
                                        );
                                    })
                                    .sort((a, b) => {
                                        return a.position - b.position;
                                    })}
                                channel={true}
                                apply={true}
                                disableButton={disableButton}
                                onApply={changeSystemChannel}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default General;

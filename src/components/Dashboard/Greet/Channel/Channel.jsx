import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUpdatedConfig } from "../../../utilities/changeConfig";
import Dropdown from "../../../Dropdown/Dropdown";

import "./Channel.scss";

const Channel = ({ toastId, updateConfig, disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);
    const guildChannels = useSelector((state) => state.guild.channels);

    const [selectedChannel, setSelectedChannel] = React.useState(
        guildChannels?.find((c) => c.id === greetConfig?.channel || "")
    );

    // Sync greet channel
    React.useEffect(() => {
        setSelectedChannel(
            guildChannels?.find((c) => c.id === greetConfig?.channel)
        );
    }, [greetConfig, guildChannels]);

    // handle change system channel apply
    const changeGreetChannel = () => {
        if (greetConfig?.channel === selectedChannel?.id) {
            return toast.warn(
                `System channel is already set to ${selectedChannel.name}`
            );
        }
        setDisableButton(true);
        if (!selectedChannel || selectedChannel === "-- disabled --") {
            updateConfig(getUpdatedConfig(greetConfig, { channel: null }));
            toastId.current = toast.info("Removing Greet Channel...", {
                autoClose: false,
            });
        } else {
            updateConfig(
                getUpdatedConfig(greetConfig, { channel: selectedChannel.id }),
                "Greet Channel set to " + selectedChannel.name
            );
            toastId.current = toast.info("Changing Greet Channel...", {
                autoClose: false,
            });
        }
    };

    return (
        <>
            <div className="greet-std-container">
                <p className="greet-title">Channel</p>
                {!selectedChannel ? (
                    <p className="greet-content">
                        <b>Greet Messages are disabled!</b>
                        <br />
                        Please select any chanel from below dropdown to enable
                        greet messages.
                    </p>
                ) : (
                    <p className="greet-content">
                        Bot will send random greet message from list of custom
                        messages in this channel.
                    </p>
                )}

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
                    onApply={changeGreetChannel}
                    clear={true}
                />
            </div>
        </>
    );
};

export default Channel;

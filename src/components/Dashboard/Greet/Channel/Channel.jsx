import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Dropdown from "../../../Dropdown/Dropdown";

import "./Channel.scss";

const Channel = ({ disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);
    const guildChannels = useSelector((state) => state.guild.channels);

    const toastId = React.useRef(null);
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
    const changeSystemChannel = () => {
        if (!selectedChannel || selectedChannel === "-- disabled --") {
            // TODO: remove greet channel, backend call
            return toast.success("Greet channel is disabled", {
                toastId: toastId.current,
            });
        }
        if (greetConfig?.channel === selectedChannel.id) {
            return toast.warn(
                `System channel is already set to ${selectedChannel.name}`
            );
        }
        setDisableButton(true);
        toastId.current = toast.info("Changing System Channel...", {
            autoClose: false,
        });

        // TODO: change system channel, backend call
        setTimeout(() => {
            toast.update(toastId.current, {
                render: "System Channel updated!",
                type: toast.TYPE.SUCCESS,
                autoClose: 5000,
            });
            setDisableButton(false);
        }, 1000);
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
                    onApply={changeSystemChannel}
                    clear={true}
                />
            </div>
        </>
    );
};

export default Channel;

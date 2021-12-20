import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
    setDbGeneralConfig,
    setSystemChannelId,
    setSystemChannelFlags,
} from "../../../store/guildSlice";
import {
    updatePrefix,
    updateBotNickname,
    updateGuildSystemChannel,
    updateGuildSystemChannelFlags,
} from "../../../api/index";

import Dropdown from "../../Dropdown/Dropdown";

import Messages from "./Messages/Messages";
import Images from "./Images/Images";

import "./Greet.scss";

const Greet = ({ setActiveTab }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);
    const guildChannels = useSelector((state) => state.guild.channels);
    const systemChannelId = useSelector((state) => state.guild.systemChannelId);
    const guildFlags = useSelector((state) => state.guild.systemChannelFlags);

    const toastId = React.useRef(null);
    const [disableButton, setDisableButton] = React.useState(false);
    const [greetDisabled, setGreetDisabled] = React.useState(true);
    const handleActiveStateChange = () => {
        setActiveTab("general");
        history.push(
            `/dashboard/${history.location.pathname.split("/")[2]}/general`
        );
    };

    const [addon, setAddon] = React.useState(greetConfig?.greetAddon || "");
    const [color, setColor] = React.useState(greetConfig?.color || null);
    const [messages, setMessages] = React.useState(greetConfig?.messages || []);
    const [images, setImages] = React.useState(greetConfig?.images || []);
    const [stats, setStats] = React.useState(greetConfig?.stats || false);
    const [isEmbed, setIsEmbed] = React.useState(greetConfig?.isEmbed || false);
    const [isDM, setIsDM] = React.useState(greetConfig?.dm || false);
    const [reaction, setReaction] = React.useState(greetConfig?.reaction || 0);
    const [greetChannel, setGreetChannel] = React.useState(
        greetConfig?.channel
            ? guildChannels.find((r) => r.id === greetConfig?.channel)
            : null
    );
    const [author, setAuthor] = React.useState(greetConfig?.author || "");
    const [authorIcon, setAuthorIcon] = React.useState(
        greetConfig?.authorIcon || ""
    );

    // Sync greet disable states
    React.useEffect(() => {
        setGreetDisabled(
            guildFlags?.includes("SUPPRESS_PREMIUM_SUBSCRIPTIONS") ||
                !systemChannelId
        );
    }, [systemChannelId, guildFlags]);

    return (
        <>
            <h1 className="greet-heading">Booster Greeting Message</h1>

            <div className="greet">
                {/* ENABLE || DISABLE greet messages */}
                <div className="greet-std-container">
                    <p className="greet-title">System Boost Message:</p>
                    <div className="greet-content">
                        <p>
                            System Boost Messages are{" "}
                            <b>{greetDisabled ? "Disabled" : "Enabled"}</b>{" "}
                            <br /> These are required for proper functioning of
                            Booster Bot. <br />
                            {!greetDisabled &&
                                "⚠️ You can disable them in the Server Settings -> System Messages."}
                        </p>
                        {greetDisabled && (
                            <button
                                className="greet-enable-button"
                                onClick={handleActiveStateChange}
                            >
                                Enable from here!
                            </button>
                        )}
                    </div>
                </div>

                {/* GREET MESSAGE SETTINGS */}
                <Messages
                    disableButton={disableButton}
                    setDisableButton={setDisableButton}
                />

                {/* GREET IMAGE SETTINGS */}
                <Images
                    disableButton={disableButton}
                    setDisableButton={setDisableButton}
                />
            </div>
        </>
    );
};

export default Greet;

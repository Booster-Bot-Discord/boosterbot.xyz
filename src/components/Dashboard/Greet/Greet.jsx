import React from "react";
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

import "./Greet.scss";

const Greet = () => {
    const dispatch = useDispatch();
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);
    const guildChannels = useSelector((state) => state.guild.channels);

    const toastId = React.useRef(null);
    const [disableButton, setDisableButton] = React.useState(false);

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

    return (
        <>
            <h1 className="greet-heading">Booster Greeting Message</h1>

            <div className="greet">
                {/* Bot Manager Setup Container */}
                <div className="greet-std-container">
                    <p className="greet-title">Setup Greet Message:</p>
                    <div className="greet-content">
                        <p>
                            Manager can edit bot settings via commands (if they
                            don't have access to dashbaord)
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Greet;

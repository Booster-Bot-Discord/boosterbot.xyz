import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useGuildData } from "../../services/guild";

import Navbar from "../../components/Navbar/Navbar";

import "./Dashboard.scss";

const ServerPicker = () => {
    const [guildAvailable, setguildAvailable] = useState(
        useSelector((state) => state.guild.available)
    );

    // fetch guild if guild is not available
    const guildData = useGuildData();
    if (!guildAvailable) {
        console.log("fetching");
        setguildAvailable(true);
        guildData(window.location.pathname.split("/")[2]);
    }

    return (
        <>
            <Navbar />
        </>
    );
};

export default ServerPicker;

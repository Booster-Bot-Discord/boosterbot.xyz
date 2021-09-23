import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { useGuildData } from "../../services/guild";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./Dashboard.scss";

const ServerPicker = () => {
    const history = useHistory();

    const [guildAvailable, setguildAvailable] = useState(
        useSelector((state) => state.guild.available)
    );

    // fetch guild if guild is not available
    const guildData = useGuildData();
    if (!guildAvailable) {
        console.log("fetching guild data");
        setguildAvailable(true);
        guildData(history.location.pathname.split("/")[2]);
    }

    return (
        <>
            <Navbar />

            <div className="dashboard">
                <Sidebar />
            </div>
        </>
    );
};

export default ServerPicker;

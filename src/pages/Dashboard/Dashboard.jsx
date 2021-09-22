import React, { useEffect } from "react";

import { getGuildConfig } from "../../api";

import Navbar from "../../components/Navbar/Navbar";

import "./Dashboard.scss";

const ServerPicker = () => {
    const [guildConfig, setGuildConfig] = React.useState(null);
    useEffect(() => {
        getGuildConfig().then((res) => {
            console.log(res.data);
            setGuildConfig(res.data.guildConfig);
        });
    }, []);

    return (
        <>
            <Navbar />
        </>
    );
};

export default ServerPicker;

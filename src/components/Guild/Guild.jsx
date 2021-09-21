import React from "react";

import "./Guild.scss";

const Guild = ({ guild, manageable, invitable }) => {
    const icon = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`;
    return (
        <>
            <div className="guild">
                <img
                    alt={guild.name + " icon"}
                    className={`guild-icon ${
                        manageable ? "guild-manageable" : null
                    } ${invitable ? "guild-invitable" : null}`}
                    src={icon}
                />
                <div className="guild-name">{guild.name}</div>
            </div>
        </>
    );
};

export default Guild;

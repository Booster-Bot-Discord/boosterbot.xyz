import React from "react";
import { Link } from "react-router-dom";

import "./Guild.scss";

const Guild = ({ guild, manageable, invitable }) => {
    const icon = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`;
    const inviteURL = `https://discord.com/oauth2/authorize?&client_id=797339074146205706&scope=applications.commands+bot&permissions=1343581297&guild_id=${guild.id}&redirect_uri=https%3A%2F%2Fboosterbot.xyz%2Flanding&scope=bot&response_type=code`;

    return (
        <>
            <div className="guild">
                {manageable ? (
                    <Link to={`/dashboard/${guild.id}`}>
                        <img
                            alt={guild.name + " icon"}
                            className="guild-icon guild-manageable"
                            src={icon}
                        />
                    </Link>
                ) : (
                    <a
                        href={inviteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            alt={guild.name + " icon"}
                            className="guild-icon guild-invitable"
                            src={icon}
                        />
                    </a>
                )}

                <div className="guild-name">{guild.name}</div>
            </div>
        </>
    );
};

export default Guild;

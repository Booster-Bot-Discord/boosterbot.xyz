import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import { sidebarData } from "./sidebarData";

import "./Sidebar.scss";

function Sidebar({ activeTab, setActiveTab }) {
    const history = useHistory();

    const guildIcon = useSelector((state) => state.guild.icon);
    const guildName = useSelector((state) => state.guild.name);
    const guildMembers = useSelector((state) => state.guild.memberCount);

    useEffect(() => {
        setActiveTab(history.location.pathname.split("/")[3]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-guild">
                    <img
                        className="sidebar-guild-icon"
                        src={guildIcon}
                        alt={guildName}
                        onClick={() =>
                            history.push(
                                `/dashboard/${
                                    history.location.pathname.split("/")[2]
                                }/general`
                            )
                        }
                    />
                    <h3 className="sidebar-guild-name">{guildName}</h3>
                    <p className="sidebar-guild-members">
                        {guildMembers} members
                    </p>
                </div>
                {sidebarData.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={
                                "sidebar-item " +
                                (activeTab === item.link
                                    ? "sidebar-item-active"
                                    : "")
                            }
                            onClick={() => {
                                setActiveTab(item.link);
                                history.push(
                                    `/dashboard/${
                                        history.location.pathname.split("/")[2]
                                    }/${item.link}`
                                );
                            }}
                        >
                            <div className="sidebar-item-icon">
                                {activeTab === item.link
                                    ? item.activeIcon
                                    : item.icon}
                            </div>
                            <h3 className="sidebar-item-title">{item.title}</h3>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Sidebar;

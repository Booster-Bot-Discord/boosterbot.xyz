import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { sidebarData } from "./sidebarData";

import "./Sidebar.scss";

function Sidebar() {
    const history = useHistory();
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const path = history.location.pathname;
        setActiveTab(path.split("/")[3]);
    }, [history]);

    return (
        <>
            <div className="sidebar">
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

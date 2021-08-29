import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDiscordLogin } from "../../services/auth";

import logo from "../../assets/logo.svg";
import navVector from "../../assets/nav-vector.svg";
import discordLogo from "../../assets/discord-white.logo.svg";

import "./Navbar.scss";

const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const username = useSelector((state) => state.user.username);
    const discordLogin = useDiscordLogin();

    return (
        <>
            <div className="nav">
                {/* top right vector */}
                <img src={navVector} className="topVector" alt="top-vector" />
                <NavLink to="/" className="nav-brand">
                    <img src={logo} className="nav-brand-logo" alt="logo" />
                    <p className="nav-brand-title">boosterbot</p>
                </NavLink>
                <div className="nav-links">
                    <NavLink to="/" className="nav-link">
                        invite
                    </NavLink>
                    <NavLink to="/" className="nav-link">
                        docs
                    </NavLink>
                    <NavLink to="/" className="nav-link">
                        discord
                    </NavLink>
                    <NavLink to="/" className="nav-link">
                        commands
                    </NavLink>
                    {!isAuthenticated ? (
                        <button onClick={discordLogin} className="login-button">
                            <img src={discordLogo} alt="discord_logo" />
                            <p className="login-title">login</p>
                        </button>
                    ): (
                        <p className="login-title">{username}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;

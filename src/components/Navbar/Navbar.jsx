import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo.svg";
import navVector from "../../assets/nav-vector.svg";
import discordLogo from "../../assets/discord-white.logo.svg";

import "./Navbar.scss";

const Navbar = () => {
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
                    <div className="login-button">
                        <img src={discordLogo} alt="discord_logo" />
                        <p className="login-title">login</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;

import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo.svg";
import topVector from "../../assets/top-vector.svg";
import discordLogo from "../../assets/discord-white.logo.svg";

import "./Hero.scss";

const Hero = () => {
    return (
        <>
            <div className="hero">
                {/* navbar (only hero navbar) */}
                <div className="nav">
                    <NavLink to="/" className="nav-brand">
                        <img src={logo} className="nav-brand-logo" alt="logo" />
                        <p className="nav-brand-title">boosterbot</p>
                    </NavLink>
                    <div className="nav-links">
                        <NavLink to="/" className="nav-link">
                            {" "}
                            invite{" "}
                        </NavLink>
                        <NavLink to="/" className="nav-link">
                            {" "}
                            docs{" "}
                        </NavLink>
                        <NavLink to="/" className="nav-link">
                            {" "}
                            discord{" "}
                        </NavLink>
                        <NavLink to="/" className="nav-link">
                            {" "}
                            commands{" "}
                        </NavLink>
                        <div className="login-button">
                            <img src={discordLogo} alt="discord_logo" />
                            <p className="login-title">login</p>
                        </div>
                    </div>
                </div>
                <div className="hero-content">
                    {/* hero heading */}
                    <div className="hero-heading">
                        track, log and greet <br />
                        your server boosters 🚀
                    </div>
                    <div className="hero-button">
                        {/* hero button */}
                        <NavLink to="/">
                            <p>manage servers</p>
                        </NavLink>
                    </div>
                </div>
            </div>
            <img src={topVector} className="topVector" alt="top-vector" />
        </>
    );
};

export default Hero;

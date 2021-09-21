import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
import { useDiscordLogin } from "../../services/auth";

import Blob from "../Blob/Blob";
import Navbar from "../Navbar/Navbar";

import wave from "../../assets/wave.svg";

import "./Hero.scss";

const Hero = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const discordLogin = useDiscordLogin();

    return (
        <>
            <Blob />
            <div className="hero">
                <Navbar />
                <div className="hero-content">
                    {/* hero heading */}
                    <div className="hero-heading">
                        <Typewriter
                            options={{
                                strings: [
                                    "Track",
                                    "Log",
                                    "Greet",
                                    "Reward",
                                    "Celebrate",
                                ],
                                autoStart: true,
                                loop: true,
                                pauseFor: 2500,
                            }}
                        />
                        Your Server Boosters
                    </div>
                    <div className="hero-button">
                        {/* hero button */}
                        {isAuthenticated ? (
                            <>
                                <NavLink to="/dashboard">
                                    <p>Manage Servers</p>
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <button onClick={discordLogin}>
                                    <p>Login to Dashboard</p>
                                </button>
                            </>
                        )}
                    </div>
                    {/* wave */}
                    <img src={wave} className="hero-wave" alt="wave" />
                </div>
            </div>
        </>
    );
};

export default Hero;

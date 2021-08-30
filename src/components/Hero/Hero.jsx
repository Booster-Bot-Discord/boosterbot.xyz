import React from "react";
import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";

import Blob from "../Blob/Blob";
import Navbar from "../Navbar/Navbar";

import wave from "../../assets/wave.svg";

import "./Hero.scss";

const Hero = () => {
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
                                strings: ["Track", "Log", "Greet", "Reward", "Celebrate"],
                                autoStart: true,
                                loop: true,
                                pauseFor: 2500,
                            }}
                        />
                        Your Server Boosters
                    </div>
                    <div className="hero-button">
                        {/* hero button */}
                        <NavLink to="/">
                            <p>Manage Servers</p>
                        </NavLink>
                    </div>
                    {/* wave */}
                    <img src={wave} className="hero-wave" alt="wave" />
                </div>
            </div>
        </>
    );
};

export default Hero;

import React from "react";
import { NavLink } from "react-router-dom";

import wave from "../../assets/wave.svg";

import "./Hero.scss";

const Hero = () => {
    return (
        <>
            <div className="hero">
                <div className="hero-content">
                    {/* hero heading */}
                    <div className="hero-heading">
                        track, log and greet <br />
                        your server boosters
                    </div>
                    <div className="hero-button">
                        {/* hero button */}
                        <NavLink to="/">
                            <p>manage servers</p>
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

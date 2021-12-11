import React from "react";

import sunglassLogo from "../../assets/images/sunglass-logo.png";

import "./CtaBottom.scss";

const CtaBottom = () => {
    return (
        <>
            <div className="ctaBottom">
                <h2 className="ctaBottom-title">
                    Personalise your discord server now!
                </h2>
                <div className="ctaBottom-content">
                    <img className="ctaBottom-content-image" src={sunglassLogo} alt="logo" />
                    <button className="ctaBottom-content-button">Add to Discord</button>
                    <button className="ctaBottom-content-button">Join Server</button>
                </div>
            </div>
        </>
    );
};

export default CtaBottom;

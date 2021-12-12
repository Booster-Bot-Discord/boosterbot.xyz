import React from "react";

import botLogo from "../../assets/logo.svg";
import heartLogo from "../../assets/images/heart-logo.png";
import patreonLogo from "../../assets/images/patreon.png";

import "./Footer.scss";
import { NavLink } from "react-router-dom";

const Footer = () => {
    const year = new Date().getFullYear();
    const inviteLink = "https://boosterbot.xyz/invite";
    const premiumLink = "https://boosterbot.xyz/premium";

    return (
        <>
            <div className="footer">
                <div className="footer-left">
                    <div className="footer-left-logo">
                        <img src={botLogo} alt="logo" />
                    </div>
                    <div className="footer-left-text">
                        <p className="footer-left-text-title">Booster Bot</p>
                        <p className="footer-left-text-subtitle">
                            Copyright © {year} DEV Studios
                        </p>
                    </div>
                </div>
                <div className="footer-middle">
                    <a
                        href={premiumLink}
                        target="_blank"
                        rel="noreferrer"
                        className="footer-link"
                    >
                        <img src={patreonLogo} alt="patreon" />
                        <p>Premium</p>
                    </a>
                    <a
                        href={inviteLink}
                        target="_blank"
                        rel="noreferrer"
                        className="footer-link"
                    >
                        <img src={heartLogo} alt="patreon" />
                        <p>Invite</p>
                    </a>
                    <NavLink to="/" className="footer-link">
                        <img src={botLogo} alt="patreon" />
                        <p>Commands</p>
                    </NavLink>
                </div>
                <div className="footer-right">
                    <NavLink to="/" className="footer-link">
                        <p>Privacy</p>
                    </NavLink>
                    <NavLink to="/" className="footer-link">
                        <p>Terms</p>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Footer;

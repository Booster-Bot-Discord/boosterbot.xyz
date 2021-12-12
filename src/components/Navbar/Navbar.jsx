import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDiscordLogin, useLogout } from "../../services/auth";

import logo from "../../assets/logo.svg";
import navVector from "../../assets/nav-vector.svg";
import discordLogo from "../../assets/discord-white.logo.svg";

import "./Navbar.scss";

const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const avatar = useSelector((state) => state.user.avatar);
    const discordId = useSelector((state) => state.user.discordId);
    const discordLogin = useDiscordLogin();
    const logout = useLogout();

    const [showDropdown, setShowDropdown] = React.useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const inviteLink = "https://boosterbot.xyz/invite";
    const premiumLink = "https://boosterbot.xyz/premium";
    const serverLink = "https://boosterbot.xyz/support";
    const docsLink =
        "https://discord.bots.gg/bots/797339074146205706#getting-started";

    return (
        <>
            <div className="nav">
                {/* top right vector */}
                <img src={navVector} className="topVector" alt="top-vector" />
                <NavLink to="/" className="nav-brand">
                    <img src={logo} className="nav-brand-logo" alt="logo" />
                    <p className="nav-brand-title">Booster Bot</p>
                </NavLink>
                <div className="nav-links">
                    <a
                        href={inviteLink}
                        target="_blank"
                        rel="noreferrer"
                        className="nav-link"
                    >
                        <span>Invite</span>
                    </a>
                    <a
                        href={docsLink}
                        target="_blank"
                        rel="noreferrer"
                        className="nav-link"
                    >
                        Docs
                    </a>
                    <a
                        href={premiumLink}
                        target="_blank"
                        rel="noreferrer"
                        className="nav-link"
                    >
                        <span>Premium</span>
                    </a>
                    <a
                        href={serverLink}
                        target="_blank"
                        rel="noreferrer"
                        className="nav-link"
                    >
                        Discord
                    </a>
                    {!isAuthenticated ? (
                        <button onClick={discordLogin} className="login-button">
                            <img src={discordLogo} alt="discord_logo" />
                            <p className="login-title">Login</p>
                        </button>
                    ) : (
                        <div onClick={toggleDropdown} className="nav-user">
                            <img
                                className="nav-user-avatar"
                                src={`https://cdn.discordapp.com/avatars/${discordId}/${avatar}.jpg?size=128`}
                                alt="avatar"
                            />
                            <button className="nav-user-arrowButton" />
                            {showDropdown && (
                                <div className="nav-user-dropdown">
                                    <NavLink
                                        to="/dashboard"
                                        className="nav-user-dropdown-link"
                                    >
                                        Dashboard
                                    </NavLink>
                                    <a
                                        href={premiumLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="nav-user-dropdown-link"
                                    >
                                        Premium
                                    </a>
                                    <button
                                        className="nav-user-dropdown-logout"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;

import React from "react";
import Hero from "../../components/Hero/Hero";
import CtaMid from "../../components/Cta/CtaMid";
import CtaBottom from "../../components/Cta/CtaBottom";
import Footer from "../../components/Footer/Footer";

import { getStats } from "../../api/index.js";

import heartEyesLogo from "../../assets/images/heart-eyes-logo.png";
import ghostLogo from "../../assets/images/ghost-logo.png";
import monkyLogo from "../../assets/images/monky-logo.png";
import heartLogo from "../../assets/images/heart-logo.png";
import midLine from "../../assets/mid-line.svg";

import "./Landing.scss";

const Landing = () => {
    const [members, setMembers] = React.useState("3500000+");
    const [servers, setServers] = React.useState("5200+");
    const [commands, setCommands] = React.useState("150000+");
    const [messages, setMessages] = React.useState("3500000+");
    const [boosts, setBoosts] = React.useState("100000+");

    React.useEffect(() => {
        const lastFetchedTimestamp = localStorage.getItem("lastTimestamp");
        if (
            lastFetchedTimestamp === null ||
            lastFetchedTimestamp < Date.now() - 600000
        ) {
            getStats()
                .then((res) => {
                    const stats = res.data.stats;
                    localStorage.setItem("lastTimestamp", Date.now());
                    localStorage.setItem("lastMembers", stats.members);
                    localStorage.setItem("lastServers", stats.servers);
                    localStorage.setItem("lastCommands", stats.commands);
                    localStorage.setItem("lastMessages", stats.messages);
                    localStorage.setItem("lastBoosts", stats.boosts);
                    setMembers(stats.members);
                    setServers(stats.servers);
                    setCommands(stats.commands);
                    setMessages(stats.messages);
                    setBoosts(stats.boosts);
                })
                .catch((err) => console.log(err));
        } else {
            setMembers(localStorage.getItem("lastMembers"));
            setServers(localStorage.getItem("lastServers"));
            setCommands(localStorage.getItem("lastCommands"));
            setMessages(localStorage.getItem("lastMessages"));
            setBoosts(localStorage.getItem("lastBoosts"));
        }
    }, []);

    return (
        <>
            <div className="scrollbar flex flex-col">

                {/* HERO HEADER */}
                <Hero />

                <section className="stats">
                    <h3 className="stats-heading">Built for you</h3>
                    <img
                        className="stats-mid-line"
                        src={midLine}
                        alt="mid-line"
                    />

                    <div className="stats-container">
                        <div className="stats-item">
                            <p className="stats-item-content">
                                Serving <br />{" "}
                                <strong className="strong-members">
                                    {members}
                                </strong>{" "}
                                Members <br /> in{" "}
                                <strong className="strong-servers">
                                    {servers}
                                </strong>{" "}
                                Servers
                            </p>
                        </div>
                        <div className="stats-item">
                            <p className="stats-item-content">
                                More than <br />{" "}
                                <strong className="strong-commands">
                                    {commands}
                                </strong>{" "}
                                Commands <br /> used
                            </p>
                        </div>
                        <div className="stats-item">
                            <p className="stats-item-content">
                                <strong className="strong-messages">
                                    {messages}
                                </strong>{" "}
                                Boost <br /> Messages for{" "}
                                <strong className="strong-boosts">
                                    {boosts}
                                </strong>{" "}
                                <br /> Boosts
                            </p>
                        </div>
                    </div>
                </section>

                <CtaMid />

                <section className="features">
                    <div className="features-container">
                        <div className="features-item">
                            <img
                                className="features-item-logo heart-eyes-logo"
                                src={heartEyesLogo}
                                alt="logo"
                            />
                            <h3 className="features-item-heading">
                                Personalise Boost Messages
                            </h3>
                            <p className="features-item-content">
                                Setup fully customizable boost messages to show
                                nice gesture towards server boosters.
                            </p>
                        </div>
                        <div className="features-item">
                            <img
                                className="features-item-logo ghost-logo"
                                src={ghostLogo}
                                alt="logo"
                            />
                            <h3 className="features-item-heading">
                                Custom Roles
                            </h3>
                            <p className="features-item-content">
                                Allow your boosters to claim and maintain their
                                own role. They can edit role name and color.
                            </p>
                        </div>
                    </div>
                    <div className="features-container">
                        <div className="features-item">
                            <img
                                className="features-item-logo monky-logo"
                                src={monkyLogo}
                                alt="logo"
                            />
                            <h3 className="features-item-heading">
                                Track Server Boosters
                            </h3>
                            <p className="features-item-content">
                                See who boosted and how many times OR removed
                                boost from your server by setting up log
                                channel.
                            </p>
                        </div>
                        <div className="features-item">
                            <img
                                className="features-item-logo heart-logo"
                                src={heartLogo}
                                alt="logo"
                            />
                            <h3 className="features-item-heading">
                                Boost Stats Voice Channels
                            </h3>
                            <p className="features-item-content">
                                Use voice channels to let everyone see boost
                                stats easily, instead of opening settings.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="landing-cta">
                    <CtaBottom />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Landing;

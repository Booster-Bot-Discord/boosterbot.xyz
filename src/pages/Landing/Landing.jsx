import React from "react";
import Hero from "../../components/Hero/Hero";

import { getStats } from "../../api/index.js";
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
        console.log(lastFetchedTimestamp);
        if(lastFetchedTimestamp === null || lastFetchedTimestamp < Date.now() - 600000){
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
            .catch((err) => console.log(err.messages));
        }
        else {
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
                                Boost Messages <br /> for{" "}
                                <strong className="strong-boosts">
                                    {boosts}
                                </strong>{" "}
                                <br /> Boosts
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Landing;

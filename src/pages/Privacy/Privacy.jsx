import React from "react";

import data from "./data.json";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import heartEyesLogo from "../../assets/images/heart-eyes-logo.png";

import "./Privacy.scss";

const Privacy = () => {
    return (
        <>
            <Navbar />

            <div className="privacy-wrapper">
                <div className="scrollbar flex flex-col privacy">
                    <h1 className="privacy-heading">Privacy Policy</h1>
                    <p className="privacy-subheading">
                        Effective date: November 14, 2021
                    </p>
                    <p className="privacy-description">
                        This is to informs you of our policies regarding the
                        collection, use and disclosure of personal data when you
                        use our Service (bot) and the choices you have
                        associated with that data.
                    </p>

                    {data.map((item, index) => (
                        <div key={index} className="privacy-container">
                            <p className="privacy-container-heading">
                                {item.heading}
                            </p>

                            <ul className="privacy-container-list">
                                {item.description.map((desc, idx) => (
                                    <li
                                        key={idx}
                                        className="privacy-container-list-item"
                                    >
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <a
                        href="https://boosterbot.xyz/support"
                        target="_blank"
                        rel="noreferrer"
                        className="privacy-link"
                    >
                        <img
                            className="stats-mid-line"
                            src={heartEyesLogo}
                            alt="mid-line"
                        />
                        Join Support Server
                    </a>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Privacy;

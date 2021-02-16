import React from "react";
import { Link } from "react-router-dom";

export default function BottomCTA () {
    return (
        <div id="bottom-cta">
            <h1 id="bottom-cta-title">What are you waiting for?</h1>
            <p id="bottom-cta-subtitle">Become a part of Booster Bot community today!</p>
            <div id="invite-buttons-cta">
                <a id="bottom-cta-button"
                    target="_blank" 
                    href="https://discord.com/api/oauth2/authorize?client_id=797339074146205706&permissions=1342457921&redirect_uri=https%3A%2F%2Fboosterbot.xyz%2Foauth%2Fcallback&scope=bot"
                    rel="noreferrer noopener">
                    Invite Bot
                </a>
                <a id="bottom-cta-button" href="https://discord.gg/8kdx63YsDf" rel="noreferrer noopener">Join Server</a>
            </div>
            <p id="bottom-cta-text">Still not sure If you want this bot or not?<br/>Checkout easy to use <Link to="/commands" className="text-highlight">commands</Link> page!</p>
        </div>
    )
}
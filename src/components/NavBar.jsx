import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles/components/navbar.scss";

const Navbar = () => {
	const [navExpanded, setNavExpanded] = useState(false);

	useEffect(() => {
		if(navExpanded) {
			document.getElementById("pseudoBody").style.overflowY = "hidden";
			document.getElementById("pseudoBody").style.height = "100vh";
			document.getElementsByTagName("footer")[0].style.display = "none";
		} else if(!navExpanded){
			document.getElementById("pseudoBody").style.overflowY = "auto";
		}
	}, [navExpanded]);

	return (
		<nav id="navbar">
			<div id="navbar-mobile">
				<div id="navbar-mobile-head">
					<h2 id="navbar-mobile-head-text">Booster Bot</h2>
					<div id="navbar-mobile-head-hamburger" onClick={() => setNavExpanded(!navExpanded)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 20" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<line x1="4" y1="6" x2="20" y2="6" />
							<line x1="4" y1="12" x2="20" y2="12" />
							<line x1="4" y1="18" x2="20" y2="18" />
						</svg>
					</div>
				</div>
				<div id="navbar-mobile-container" className={navExpanded ? "visible" : ""}>
					{""}
					<div id="navbar-mobile-links" className={""}>
						<NavLink
							className="navbar-mobile-link"
							activeClassName="active"
							exact to="/"
							onClick={() => {
								setTimeout(() => {
									setNavExpanded(!navExpanded);
								}, 1000)
							}}>Home</NavLink>

						<NavLink
							className="navbar-mobile-link"
							activeClassName="active"
							to="/commands"
							onClick={() => {
								setTimeout(() => {
									setNavExpanded(!navExpanded);
								}, 1000)
							}}>Commands</NavLink>

						<NavLink
							className="navbar-mobile-link"
							activeClassName="active"
							to="/faq"
							onClick={() => {
								setTimeout(() => {
									setNavExpanded(!navExpanded);
								}, 1000)
							}}>FAQ</NavLink>

					</div>
				</div>
			</div>
			<ul id="navbar-links">
				<li className="navbar-link"><NavLink activeClassName="active" exact to="/">Home</NavLink></li>
				<li className="navbar-link discount"><a rel="noreferrer" target="_blank" href="https://boosterbot.xyz/premium">Premium</a></li>
				<li className="navbar-link"><a rel="noreferrer" target="_blank" href="https://docs.boosterbot.xyz/">Documentation</a></li>
				{/* <li className="navbar-link"><NavLink activeClassName="active" to="/commands">Commands</NavLink></li> */}
				<li className="navbar-link"><a rel="noreferrer" target="_blank" href="https://discord.gg/8kdx63YsDf">Support Server</a></li>
				<li className="navbar-link"><a rel="noreferrer" target="_blank" href="https://top.gg/bot/797339074146205706/vote">Vote</a></li>
				<li className="navbar-link"><NavLink activeClassName="active" to="/faq">FAQ</NavLink></li>
			</ul>
		</nav>
	);
};

export default Navbar;

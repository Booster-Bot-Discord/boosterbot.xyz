import React from 'react';
import '../assets/styles/components/navbar.scss';


const Navbar = () => {

	return (
		<nav id="navbar">
			<ul id="navbar-links">
				<li className="navbar-link">Home</li>
				<li className="navbar-link">Commands</li>
				<li className="navbar-link"><a href="https://discord.gg/8kdx63YsDf">Support</a></li>
				<li className="navbar-link">Blog</li>
				<li className="navbar-link">FAQ</li>
				<li className="navbar-link">Store</li>
				<li className="navbar-link">
					<a href={"/oauth/login?redirect=" + window.location.pathname} rel="noreferrer noopener">Login</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/pages/singular/notfound.scss";

export default function NotFound() {

	return (
		<div id="notfound">
			<div id="notfound-text">
				<h1 id="notfound-text-title">404!</h1>
				<p id="notfound-text-message">I think you're lost!<br/>The page you're looking for is not available.</p>
				<Link id="notfound-text-button" to="/">Go home</Link> <br/>
				<a id="notfound-text-button" rel="noreferrer" target="_blank" href="https://discord.gg/8kdx63YsDf">Support Server</a>
			</div>
		</div>
	)
}
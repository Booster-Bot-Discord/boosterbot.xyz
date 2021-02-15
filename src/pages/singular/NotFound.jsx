import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/pages/singular/notfound.scss";

export default function NotFound() {

	return (
		<div id="notfound">
			<div id="notfound-text">
				<h1 id="notfound-text-title">Oh no!</h1><br/>
				<p id="notfound-text-message">I think you're lost!<br/>The page you're looking for is not available.</p><br/>
				<Link id="notfound-text-button" to="/">Go home</Link>
			</div>
		</div>
	)
}
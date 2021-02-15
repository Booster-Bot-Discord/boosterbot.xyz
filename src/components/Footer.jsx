import React from "react";
import Logo from "../assets/images/bb.png";
import KoFi from "../assets/images/ko-fi.png";
import Patreon from "../assets/images/patreon.png";

import "../assets/styles/components/footer.scss";

export default React.memo(() => (
	<footer>
    	<div id="footer-content">
      		<div id="footer-left">
			    <img id="footer-logo" src={Logo} alt="Booster Bot logo" />
				<div id="footer-left-text">
					<h2 id="footer-title">Booster Bot</h2>
					<span id="footer-copyright">Copyright © {new Date().getFullYear()} Booster Bot</span>
					<span data-ccpa-link="1"></span>
				</div>
			</div>
			<div id="footer-links">
				<div className="footer-links-col">
					<a className="footer-link" rel="noreferrer" target="_blank"  href="https://www.patreon.com/join/boosterbot"> 
					<img height="15rem!important;" src={Patreon} alt="Patreon Logo" /> Patreon
					</a>
					<a className="footer-link" rel="noreferrer" target="_blank"  href="https://ko-fi.com/diabolusgx">
						<img height="15rem!important;" src={KoFi} alt="Ko-Fi Logo" /> Ko-Fi
					</a>
				</div>
				<div className="footer-links-col">
					<p className="footer-link">WORK IN PROGRESS!</p>
					<p className="footer-link">Other Things are under maintainance.</p>
				</div>
			</div>
    	</div>
  	</footer>
));
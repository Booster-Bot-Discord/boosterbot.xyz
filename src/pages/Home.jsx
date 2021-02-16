import React from "react";
import RoleIMG from "../assets/images/role-claim.png";
import StatsIMG from "../assets/images/stats-drop.png";
import EmojiIMG from "../assets/images/emoji-info.png";
import GreetIMG from "../assets/images/greet.png";
import "../assets/styles/pages/home.scss";
import BottomCTA from "../components/BottomCTA";

export default function Home () {

	return (
		<div id="home">
    		<div id="home-hero">
				<div id="home-hero-text">
					<h1 id="home-hero-text-title">Booster Bot</h1><br/>
					<p id="home-hero-text-slogan">Track, log and greet your server boosters <span className="text-highlight">easily</span> with the best server <span className="text-highlight">booster manager</span> bot.</p>
				</div><br/>
				<div id="home-hero-cta">
					<a id="home-hero-cta-invite"
						href="https://discord.com/oauth2/authorize?client_id=797339074146205706&permissions=1342457921&redirect_uri=https%3A%2F%2Fboosterbot.xyz%2Flanding&scope=bot&response_type=code"
						rel="noreferrer noopener">
						Invite now
					</a>
				</div>
					<div id="home-hero-circles">
						<svg height="500" width="1020">
							<circle cx="140" cy="360" r="140" fill="#242424"/>
							<circle cx="300" cy="40" r="40" fill="#242424"/>
							<circle cx="700" cy="130" r="15" fill="#242424"/>
							<circle cx="900" cy="120" r="100" fill="#242424"/>
							<circle cx="950" cy="400" r="70" fill="#242424"/>
							<circle cx="560" cy="450" r="25" fill="#242424"/>
						</svg>
					</div>
				<div id="nitropay-home-top" class="nitropay" />
    		</div>
    		<section>
      			<div className="text-area">
        			<h3 className="section-title"><span className="text-highlight">Amazing</span> Greet<br/> Messages</h3>
        			<p className="section-body short">Booster Bot provides you the most versatile custom greet messages & Images you can set and bot will send random message and image from list of provided options whenever someone boosts the server.</p>
        		</div>
				<img className="img-ex" height="15rem!important;" alt="Booster Bot provides vast verity and options to set custom greet messages" src={GreetIMG}/>
    		</section>
    		<section className="reverse">
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Cool</span> Booster<br/> Commands</h3>
					<p className="section-body">Booster Bot provides you cool additional commands for server booster. Boosters can maintain their own custom/private role (only name and color).</p>
        		</div>
				<img className="img-ex" alt="Booster Bot's features for server boosters - custom/personal role" src={RoleIMG}/>
    		</section>
			<div id="nitropay-home-middle" class="nitropay" />
			<section>
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Maintain</span> Server<br/> Booster stats</h3>
					<p className="section-body">Want to see who boosted your server and when? Or want to arrange boosters on basis of number of boosts and old to new booster?<br/>Booster Bot got you for tracking and maintaining booster stats for your server.</p>
				</div>
				<img id="homepage-snowflake-image" height="15rem!important;" alt="Booster Bot stores and maintains booster's data and stats for you." src={StatsIMG}/>
			</section>
			<section className="reverse">
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Unique</span> Server<br/> Features</h3>
					<p className="section-body">Booster Bot adds unique features to your Server and exciting features like restricting emojis to specific role, boost level roles and more!</p>
				</div>
				<img className="img-ex" height="15rem!important;" alt="Unique commands for your server by booster bot ex. restrict emoji(s) to specific role!" src={EmojiIMG}/>
			</section>
			<div id="nitropay-home-bottom" class="nitropay" />
			<br/>
			<BottomCTA/>
			<span data-ccpa-link="1"></span>
  		</div>
	);
}
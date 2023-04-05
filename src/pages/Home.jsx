import React from "react";
// import RoleIMG from "../assets/images/role-claim.png";
import RoleIMG from "../assets/images/custom-role-channel.png";
import StatsIMG from "../assets/images/boost-stats.png";
// import StatsIMG from "../assets/images/vcstats.png";
//import StatsIMG from "../assets/images/stats-drop.png";
// import EmojiIMG from "../assets/images/emoji-info.png";
import EmojiIMG from "../assets/images/unique.png";
import GreetIMG from "../assets/images/greet-new.png";
import "../assets/styles/pages/home.scss";
import BottomCTA from "../components/BottomCTA";

export default function Home () {

	return (
		<div id="home">
    		<div id="home-hero">
				<div id="home-hero-text">
					<h1 id="home-hero-text-title">Booster Bot</h1><br/>
					<p id="home-hero-text-slogan">Track, log, greet and reward your server boosters <span className="text-highlight">easily</span> with the best server <span className="text-highlight">booster manager</span> bot.</p>
				</div><br/>
				<div id="home-hero-cta">
					<a id="home-hero-cta-invite"
						target="_blank"
						href="https://boosterbot.xyz/invite"
						rel="noreferrer noopener">
						Invite Now
					</a>
					<a id="home-hero-cta-dashboard"
						target="_blank"
						href="https://dashboard.boosterbot.xyz/"
						rel="noreferrer noopener">
						Dashboard
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
        			<h3 className="section-title"><span className="text-highlight">Custom</span> Greet<br/> Messages</h3>
        			<p className="section-body short">Booster Bot sends fully customisable greet message when someone boosts and even sends a log message when someone stops boosting along with adding and removing roles when somone boosts OR removes boost.</p>
        		</div>
				<img className="img-ex" height="15rem!important;" alt="Booster Bot provides vast verity and options to set custom greet messages" src={GreetIMG}/>
    		</section>
    		<section className="reverse">
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Rewards:</span> private roles<br/> & channels</h3>
					<p className="section-body">Boosters can also claim a custom role and channel for themselves and even share it with their friends. OR You can set level roles (based on number of boosts) and age role (based on time since boost) for boosters.</p>
        		</div>
				<img className="img-ex" alt="Booster Bot's features for server boosters - custom/personal role" src={RoleIMG}/>
    		</section>
			<div id="nitropay-home-middle" class="nitropay" />
			<section>
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Maintain</span> <br/>server stats</h3>
					<p className="section-body">Maintain server and even user level boost stats and access anytime to see who is boosting your server and how many times along with a leaderboard of server boosters.</p>
				</div>
				<img className="img-ex" height="15rem!important;" alt="Booster Bot stores and maintains booster's data and stats for you." src={StatsIMG}/>
				{/* <img id="homepage-snowflake-image" height="15rem!important;" alt="Booster Bot stores and maintains booster's data and stats for you." src={StatsIMG}/> */}
			</section>
			<section className="reverse">
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Unique</span> <br/>server features</h3>
					<p className="section-body">
						Adding to all these, there are lots of miscellanious features for boosters like auto reactions (on booster ping message or greet message), server boost stats voice channels.<br/>
						<a
							target="_blank"
							href="https://docs.boosterbot.xyz/"
							rel="noreferrer noopener"
						>
							Read more from here
						</a>
					</p>
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
import React from 'react';
import RoleIMG from '../assets/images/role.png';
import StatsIMG from '../assets/images/stats.png';
import EmojiIMG from '../assets/images/emoji.png';
import GreetIMG from '../assets/images/greet.png';
import '../assets/styles/pages/home.scss';
import BottomCTA from '../components/BottomCTA';

export default function Home () {

	return (
		<div id="home">
    		<div id="home-hero">
				<div id="home-hero-text">
					<h1 id="home-hero-text-title">Booster Bot</h1><br/>
					<p id="home-hero-text-slogan">Track, log and greet your server boosters <span className="text-highlight">easily</span> with the best server <span className="text-highlight">booster manager</span> bot.</p>
				</div><br/>
				<div id="home-hero-cta">
					<a id="home-hero-cta-invite" href="https://invite.boosterbot.xyz" rel="noreferrer noopener">Invite now</a>
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
				<img height="15rem!important;" alt="Booster Bot provides vast verity and options to set custom greet messages" src={GreetIMG}/>
    		</section>
    		<section className="reverse">
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Cool</span> Booster<br/> Commands</h3>
					<p className="section-body">Booster Bot provides you cool additional commands for servre booster. Boosters can maintain their own custom/private role (only name and color).</p>
        		</div>
				<img alt="Booster Bot's features for server boosters - custom/personal role" src={RoleIMG}/>
    		</section>
			<div id="nitropay-home-middle" class="nitropay" />
			<section>
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Maintain</span> Server<br/> Booster stats</h3>
					<p className="section-body">Want so see who boosted your server and when? Or want to arrange boosters on basis of number of boosts and old to new booster?<br/>Booster Bot got you for tracking and maintaining booster stats for your server.</p>
				</div>
				<img height="15rem!important;" alt="Booster Bot stores and maintains booster's data and stats for you." src={StatsIMG}/>
			</section>
			<section className="reverse">
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Unique</span> Server<br/> Features</h3>
					<p className="section-body">We have two GIANT servers for you to join, all about Dank Memer! One is purely for support and announcements, and the other is a community server based around using the bot and participating in giveaways of our currency system!</p>
				</div>
				<img id="homepage-snowflake-image" alt="We have two GIANT community servers for Dank Memer. One is for bot support, the other is for hanging out with other users and giveaways!" src={EmojiIMG}/>
			</section>
			<div id="nitropay-home-bottom" class="nitropay" />
			<br/>
			<BottomCTA/>
			<span data-ccpa-link="1"></span>
  		</div>
	);
}
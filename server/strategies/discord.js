require("dotenv").config();
const passport = require('passport');
const User = require("../database/models/User");
const DiscordStrategy = require('passport-discord').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// Set up Passport Discord Strategy
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/api/v1/auth/discord/callback`,
    scope: ['identify', 'guilds']
},
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const userExists = await User.exists({ discordId: profile.id });
            if (userExists) {
                const user = await User.findOneAndUpdate({ discordId: profile.id }, {
                    username: profile.username,
                    discriminator: profile.discriminator,
                    avatar: profile.avatar,
                    email: profile.email,
                    verified: profile.verified,
                    guilds: profile.guilds
                });
                return cb(null, user);
            } else {
                const user = await User.create({
                    discordId: profile.id,
                    username: profile.username,
                    discriminator: profile.discriminator,
                    avatar: profile.avatar,
                    email: profile.email,
                    verified: profile.verified,
                    guilds: profile.guilds
                });
                return cb(null, user);
            }
        } catch (err) {
            console.error("Something went wrong while logging the user in:\n", err);
            return cb(err);
        }
    })
);
require("dotenv").config();
require("./strategies/discord");

const express = require("express");
const passport = require("passport");
const helmet = require("helmet");
const sessions = require("client-sessions");
const rateLimit = require("express-rate-limit");

const database = require("./database");

// app setup
const app = express();

// Helmet without contentSecurityPolicyset to false
// blocks the react frontend from loading for some reason.
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(sessions({
    cookieName: "session", // cookie name dictates the key name added to the request object
    secret: process.env.secret, // should be a large unguessable string
    duration: 1000 * 60 * 60 * 24, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
    cookie: {
        httpOnly: true, // Cookie is not accessible from javascript
        ephemeral: true, // Exit session when browser closes
        secure: false // Only allow through SSL
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// setup rate limits
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Enter the chill zone."
});
app.use("/api/v1/", apiLimiter);

// Routes
const routes = require("./Routes");
app.use("/api/v1", routes);

const PORT = process.env.PORT || 4000;
database().then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
});

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("../config.json");
const path = require("path");

const app = express();

app.listen(config.port, () => {
    console.log("Listening to port ", config.port);
});

// set up parsing
app.use(bodyParser.json());

// Serve static files
app.use("/", express.static(__dirname + "/../build"));
app.use("/static", express.static(__dirname + "/../app/assets/"));

app.get("/status", (req, res) => res.redirect("https://status.watchbot.app/bot/797339074146205706"));
app.get("/premium", (req, res) => res.redirect("https://www.patreon.com/join/boosterbot"));
app.get("/kofi", (req, res) => res.redirect("https://ko-fi.com/diabolusgx"));
app.get("/support", (req, res) => res.redirect("https://discord.gg/8kdx63YsDf"));
app.get("/invite", (req, res) => res.redirect("https://discord.com/api/oauth2/authorize?client_id=797339074146205706&permissions=1343581297&redirect_uri=https%3A%2F%2Fboosterbot.xyz%2Flanding&scope=bot&response_type=code"));

const Routers = require("./routers");
app.set("trust proxy", 1);
app.use(session({
    secret: config.secret,
    name: "BoosterBotIsTheBest",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

//app.use("/api", Routers.API);
app.use("/oauth", Routers.OAuth);

app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "/", "../build", "index.html"));
});
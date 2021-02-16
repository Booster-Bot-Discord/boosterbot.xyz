const { encode, stringify } = require("querystring");
const { get, post } = require("axios");
const { Router } = require("express");
const { userModel } = require("../utils/database");

const config = require("../../config.json");
const router = Router();

const OAuthScope = ["identify", "email"].join(" ");
const OAuthData = encode({
    //scope: "identify",
    response_type: "code",
    client_id: config.clientID,
    redirect_uri: `${config.domain}/oauth/callback`,
    scope: OAuthScope
});

router.get("/login", (req, res) => {
    req.session.redirect = req.query.redirect;
    res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`);
});

router.get("/callback", async (req, res) => {
    if (!req.query.code) return res.status(404).redirect("/404");

    const { data } = await post("https://discordapp.com/api/v7/oauth2/token", stringify({
        client_id: config.clientID,
        client_secret: config.clientSecret,
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: `${config.domain}/oauth/callback`
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    if (data.scope !== OAuthScope) return res.status(403).send(`Expected scope "${OAuthScope}" but received scope "${data.scope}"`);

    const { data: user } = await get("https://discordapp.com/api/v7/users/@me", {
        headers: {
            "Authorization": `Bearer ${data.access_token}`
        }
    });

    if (user.email === null) return res.status(400).send("Please verify your Discord\"s account E-mail before logging in.");

    const userExists = await userModel.findOne({ id: user.id }).catch(err => {if(err) console.log(err)});
    if(userExists) {
        userModel.updateOne({ id: user.id }, {
            $set : {
                email: user.email,
                username: user.username,
                visits: `${parseInt(userExists.visits) + 1}`
            },
            $addToSet: {
                ip: req.headers["cf-connecting-ip"]
            }
        }, 
        (err) => {if(err){console.log(err)}});
    }
    else {
        const newUser = new userModel({
            id: user.id,
            visits: "0",
            username: user.username,
            email: user.email,
            ip: [req.headers["cf-connecting-ip"]]
        });
        await newUser.save().catch(err => {if(err) console.log(err)});
    }

    req.session.user = await { ...user, token: user.id };
    res.redirect(req.session.redirect || "/");
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
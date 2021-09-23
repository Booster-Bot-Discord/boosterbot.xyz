require("dotenv").config();
const axios = require("axios");
const GuildConfig = require("../database/models/GuildConfig");

// get guild config from database.
const getGuildConfig = async (req, res) => {
    try {
        const guildConfig = await GuildConfig.findOne({ id: req.params.id });
        if (!guildConfig) {
            return res.status(404).json({ message: "Guild config not found" });
        }
        return res.status(200).json(guildConfig);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// get guild from discord api
const getGuildData = async (req, res) => {
    try {
        const result = await axios.get(`https://discord.com/api/v8/guilds/${req.params.id}?with_counts=true`, {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
            }
        });
        return res.status(200).json(result.data);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

// get guild channels from discord api
const getGuildChannels = async (req, res) => {
    try {
        const result = await axios.get(`https://discord.com/api/v8/guilds/${req.params.id}/channels`, {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
            }
        });
        return res.status(200).json(result.data);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getGuildConfig,
    getGuildData,
    getGuildChannels
};
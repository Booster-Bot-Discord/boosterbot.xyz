require("dotenv").config();
const axios = require("axios");
const GuildConfig = require("../database/models/GuildConfig");

// get guild config from database.
const getGuildConfig = async (req, res) => {
    try {
        const guildConfig = await GuildConfig.findOne({ id: req.params.guildId });
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
        const result = await axios({
            method: "get",
            url: `http://localhost:3000/guilds/${req.params.guildId}`
        });
        return res.status(200).json(result.data);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getGuildConfig,
    getGuildData
};
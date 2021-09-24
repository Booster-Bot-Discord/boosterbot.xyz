require("dotenv").config();
const axios = require("axios");
const GuildConfig = require("../database/models/GuildConfig");
const GreetConfig = require("../database/models/GreetConfig");
const GuildData = require("../database/models/GuildData");

// get guild config from database.
const getGuildConfig = async (req, res) => {
    try {
        const dbGeneraConfig = await GuildConfig.findOne({ id: req.params.guildId });
        const dbGreetConfig = await GreetConfig.findOne({ id: req.params.guildId });
        const dbBoostersData = await GuildData.findOne({ id: req.params.guildId });
        return res.status(200).json({ dbGeneraConfig, dbGreetConfig, dbBoostersData });
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
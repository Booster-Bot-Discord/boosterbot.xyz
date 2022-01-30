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
        return res.status(500).json({ message: err.message });
    }
}

// update guild config in database
const updateGuildConfig = async (req, res) => {
    try {
        await axios.default.delete(`http://localhost:3000/guild/${req.params.guildId}/cache/guild-config`);
        await GuildConfig.findOneAndUpdate({ id: req.params.guildId }, req.body);
        return res.status(200).json({ message: "Guild config updated" });
    }
    catch (err) {
        return res.status(500).json({ message: "Could not update settings" });
    }
}

// update greet config in database
const updateGreetConfig = async (req, res) => {
    try {
        // TODO: GREET CONFIG CACHING
        // await axios.default.delete(`http://localhost:3000/guild/${req.params.guildId}/cache`);
        await GreetConfig.findOneAndUpdate({ id: req.params.guildId }, req.body);
        return res.status(200).json({ message: "Greet config updated" });
    }
    catch (err) {
        return res.status(500).json({ message: "Could not update settings" });
    }
}

// update guild syatem channel in discord api
const updateGuildSystemChannel = async (req, res) => {
    try {
        await axios.default.patch(`http://localhost:3000/systemchannel/${req.params.guildId}`, {
            channelId: req.body.channelId
        });
        return res.status(200).json({ message: "Guild system channel updated." });
    }
    catch (err) {
        return res.status(500).json({ message: "Could not update system channel." });
    }
}

// update guild system channal flags in discord api
const updateGuildSystemChannelFlags = async (req, res) => {
    try {
        await axios.default.patch(`http://localhost:3000/systemchannelflags/${req.params.guildId}`, {
            systemChannelFlags: req.body.flags
        });
        return res.status(200).json({ message: "Guild system channel flags updated." });
    }
    catch (err) {
        return res.status(500).json({ message: "Could not update system channel flags." });
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
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getGuildConfig,
    updateGuildConfig,
    updateGreetConfig,
    updateGuildSystemChannel,
    updateGuildSystemChannelFlags,
    getGuildData
};
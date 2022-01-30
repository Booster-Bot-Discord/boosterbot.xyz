const axios = require("axios");
const GuildConfig = require("../database/models/GuildConfig");

// get all guild IDs, call bot api
const getAllGuildIds = async (req, res) => {
    axios({
        method: "get",
        url: "http://localhost:3000/allguildids",
    })
        .then((result) => {
            res.status(200).json({
                message: "Data fetched successfully",
                guildIds: result.data
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error"
            })
        });
};

// update prefix in databse, call bot api
const updatePrefix = async (req, res) => {
    try {
        if (req.body.prefix.length < 1 || req.body.prefix.length > 35)
            return res.status(400).json({ message: "Prefix must be between 1 and 35 characters." });
        await axios.default.patch(`http://localhost:3000/prefix/${req.params.guildId}`, {
            prefix: req.body.prefix
        }).then(async () => {
            await GuildConfig.findOneAndUpdate({ id: req.params.guildId }, { prefix: req.body.prefix });
        });
        return res.status(200).json({
            message: "Prefix updated successfully"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// update bot nickname, call bot api
const updateBotNickname = async (req, res) => {
    if (!req.body.nickname || req.body.nickname.length < 1 || req.body.nickname.length > 32)
        return res.status(400).json({
            message: "Invalid nickname"
        });
    try {
        const response = await axios.default.patch(`http://localhost:3000/nickname/${req.params.guildId}`, {
            nickname: req.body.nickname
        });
        res.status(200).json({
            message: "Nickname updated successfully",
            data: response.data
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

module.exports = {
    getAllGuildIds,
    updatePrefix,
    updateBotNickname
};
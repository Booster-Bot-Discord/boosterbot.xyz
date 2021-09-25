const axios = require("axios");

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
}

// update bot nickname, call bot api
const updateBotNickname = async (req, res) => {
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
}

module.exports = {
    getAllGuildIds,
    updateBotNickname
};
const axios = require("axios");

const getAllGuildIds = async (req, res) => {
    axios({
        method: 'get',
        url: 'http://localhost:3000/allguildids',
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

module.exports = {
    getAllGuildIds
};
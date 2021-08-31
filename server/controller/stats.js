const axios = require("axios");

const getStats = async (req, res) => {
    axios({
        method: 'get',
        url: 'http://localhost:3000/stats',
    })
        .then((result) => {
            res.status(200).json({
                message: "Data fetched successfully",
                stats: result.data
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error"
            })
        });
}

module.exports = {
    getStats
};
const User = require("../database/models/User");

const getAllGuilds = async (req, res) => {
    try {
        const userDate = await User.findOne({ id: req.user.id });
        const guilds = await userDate.guilds;
        res.status(200).json({ guilds });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}


module.exports = {
    getAllGuilds
};
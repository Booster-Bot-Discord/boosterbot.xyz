const GuildConfig = require("../database/models/GuildConfig");

const getGuildConfig = async (req, res) => {
    try {
        const guildConfig = await GuildConfig.findOne({ guildId: req.params.guildId });
        if (!guildConfig) {
            return res.status(404).json({ message: "Guild config not found" });
        }
        return res.status(200).json(guildConfig);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getGuildConfig
};
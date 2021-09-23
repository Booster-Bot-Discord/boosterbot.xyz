const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else res.status(401).json({ message: "Login to perform this action!" });
}

const isGuildManager = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.params.guildId) {
            const guild = req.user.guilds.find(g => g.id === req.params.guildId);
            if (guild.owner || (guild.permissions & 0x20) === 0x20) return next();
            else res.status(401).json({ message: "Missing MANAGE_SERVER permission!" });
        }
        else res.status(404).json({ message: "Invalid GUILD_ID!" });
    }
    else res.status(401).json({ message: "Login to perform this action!" });
}

module.exports = {
    isLoggedIn,
    isGuildManager
};

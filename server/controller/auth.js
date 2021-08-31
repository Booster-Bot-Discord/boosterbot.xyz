const logout = (req, res) => {
    req.logout();
    res.clearCookie("session");
    res.json({ message: "Logout successful" });
};

const checkAuthenticated = (req, res) => {
    if (req.user) {
        res.status(200).json({
            id: req.user._id,
            discordId: req.user.discordId,
            username: req.user.username,
            avatar: req.user.avatar,
            permissionLevel: req.user.permissionLevel
        });
    }
    else {
        res.clearCookie("session");
        res.sendStatus(204);
    }
};


module.exports = {
    logout,
    checkAuthenticated
};
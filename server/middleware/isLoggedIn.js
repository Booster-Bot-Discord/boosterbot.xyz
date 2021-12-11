module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        else res.status(401).json({ message: "Login to perform this action!" });
    }
};

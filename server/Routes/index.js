const express = require('express');
const router = express.Router();

const authRoutes = require("./auth.js");
const userRoutes = require("./user.js");
const guildRoutes = require("./guild.js");
const botRoutes = require("./bot.js");

const { getStats } = require("../controller/stats");

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/bot', botRoutes);
router.use('/guild', guildRoutes);
router.get('/stats', getStats);

module.exports = router;
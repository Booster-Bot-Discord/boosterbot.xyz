const express = require('express');
const { isGuildManager } = require("../middleware/isLoggedIn");
const { getGuildConfig, getGuildData } = require("../controller/guild");

const router = express.Router();

router.get('/config/:guildId', isGuildManager, getGuildConfig);
router.get('/data/:guildId', isGuildManager, getGuildData);

module.exports = router;
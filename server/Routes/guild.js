const express = require('express');
const isLoggedIn = require("../middleware/isLoggedIn");
const { getGuildConfig, getGuildData, getGuildChannels } = require("../controller/guild");

const router = express.Router();

router.get('/config/:id', isLoggedIn, getGuildConfig);
router.get('/data/:id', isLoggedIn, getGuildData);
router.get('/data/:id/channels', isLoggedIn, getGuildChannels);

module.exports = router;
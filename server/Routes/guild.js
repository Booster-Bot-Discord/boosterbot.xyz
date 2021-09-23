const express = require('express');
const isLoggedIn = require("../middleware/isLoggedIn");
const { getGuildConfig, getGuildData } = require("../controller/guild");

const router = express.Router();

router.get('/config/:id', isLoggedIn, getGuildConfig);
router.get('/data/:id', isLoggedIn, getGuildData);

module.exports = router;
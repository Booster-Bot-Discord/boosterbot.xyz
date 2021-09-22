const express = require('express');
const isLoggedIn = require("../middleware/isLoggedIn");
const { getGuildConfig } = require("../controller/guild");

const router = express.Router();

router.get('/:id', isLoggedIn, getGuildConfig);

module.exports = router;
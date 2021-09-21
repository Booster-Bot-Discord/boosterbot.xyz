const express = require('express');
const isLoggedIn = require("../middleware/isLoggedIn");
const { getAllGuilds } = require("../controller/user");

const router = express.Router();

router.get('/allguilds', isLoggedIn, getAllGuilds);

module.exports = router;
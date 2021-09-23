const express = require('express');
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { getAllGuildIds } = require("../controller/bot");

const router = express.Router();

router.get('/allguildids', isLoggedIn, getAllGuildIds);

module.exports = router;
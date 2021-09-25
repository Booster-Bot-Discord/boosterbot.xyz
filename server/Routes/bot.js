const express = require("express");
const { isLoggedIn, isGuildManager } = require("../middleware/isLoggedIn");
const { getAllGuildIds, updateBotNickname } = require("../controller/bot");

const router = express.Router();

router.get("/allguildids", isLoggedIn, getAllGuildIds);
router.patch("/nickname/:guildId", isGuildManager, updateBotNickname)

module.exports = router;
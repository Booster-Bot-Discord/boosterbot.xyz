const express = require("express");
const { isLoggedIn, isGuildManager } = require("../middleware");
const { getAllGuildIds, updatePrefix, updateBotNickname } = require("../controller/bot");

const router = express.Router();

router.get("/allguildids", isLoggedIn, getAllGuildIds);
router.patch("/prefix/:guildId", isGuildManager, updatePrefix);
router.patch("/nickname/:guildId", isGuildManager, updateBotNickname)

module.exports = router;
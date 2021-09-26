const express = require("express");
const { isGuildManager } = require("../middleware/isLoggedIn");
const { getGuildConfig, getGuildData, updateGuildConfig, updateGuildSystemChannel, updateGuildSystemChannelFlags } = require("../controller/guild");

const router = express.Router();

router.get("/config/:guildId", isGuildManager, getGuildConfig);
router.patch("/config/:guildId", isGuildManager, updateGuildConfig);
router.patch("/systemchannel/:guildId", isGuildManager, updateGuildSystemChannel);
router.patch("/systemchannelflags/:guildId", isGuildManager, updateGuildSystemChannelFlags);
router.get("/data/:guildId", isGuildManager, getGuildData);

module.exports = router;
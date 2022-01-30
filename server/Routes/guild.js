const express = require("express");
const { isGuildManager } = require("../middleware/isGuildManager");
const {
    getGuildConfig, getGuildData, updateGuildConfig, updateGreetConfig,
    updateGuildSystemChannel, updateGuildSystemChannelFlags
} = require("../controller/guild");

const router = express.Router();

router.get("/config/:guildId", isGuildManager, getGuildConfig);
router.patch("/general/config/:guildId", isGuildManager, updateGuildConfig);
router.patch("/greet/config/:guildId", isGuildManager, updateGreetConfig);
router.patch("/systemchannel/:guildId", isGuildManager, updateGuildSystemChannel);
router.patch("/systemchannelflags/:guildId", isGuildManager, updateGuildSystemChannelFlags);
router.get("/data/:guildId", isGuildManager, getGuildData);

module.exports = router;

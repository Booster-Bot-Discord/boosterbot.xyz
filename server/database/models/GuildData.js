const mongoose = require("mongoose");

const guildDataSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    prefix: { type: String },
    suffix: { type: String },
    bannedWords: { type: Array },
    allTimeBoosts: { type: Number },
    boosters: { type: Map },
    /* key = userId, value = { totalBoosts, firstBoost, lastBoost, currBoost, roleClaimed(null/roleId) }*/
    roles: { type: Map },
    /* key = roleId, value = { userId } */
    gifts: { type: Map }
    /* key = userId (booster), value = [userId] (who received gift) */
});

module.exports = mongoose.model("guildData", guildDataSchema);
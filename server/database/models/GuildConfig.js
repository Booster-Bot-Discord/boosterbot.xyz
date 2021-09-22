const mongoose = require("mongoose");

const guildConfigSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    prefix: { type: String },
    color: { type: String },
    premium: { type: Boolean },
    botChannel: { type: String },
    joinedAt: { type: String },
    botManager: { type: String },
    systemChannel: { type: String },
    addRoles: { type: Array },
    removeRoles: { type: Array },
    baseRole: { type: String },
    giftConfig: { type: Array }, // 0 - gifts allowed, 1 - boosts required
    customRole: { type: Number },
    logChannel: { type: String },
    logEvents: { type: Map },
    // LOG EVENTS : role, gifts, boosts, settings, server
    lvlRoles: { type: Map },
    stats: { type: Map }
    // STATS : { allboosts: { id: String, name: String}, currboosts: { id: String, name: String}, 
    //    allboosters: { id: Srting, name: String}, currboosters: { id: String, name: String }}
});

module.exports = mongoose.model("guildConfig", guildConfigSchema);
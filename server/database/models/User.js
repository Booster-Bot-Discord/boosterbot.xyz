const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discordId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    discriminator: { type: String, required: true },
    permissionLevel: { type: Number, default: 1 },
    avatar: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    guilds: [{ type: Object, default: null }],
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
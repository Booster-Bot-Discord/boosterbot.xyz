const mongoose = require("mongoose");

const greetConfigSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    dm: { type: Boolean },
    addon: { type: String },
    color: { type: Array },
    author: { type: String },
    authorIcon: { type: String },
    title: { type: String },
    messages: { type: Array },
    footer: { type: String },
    footerIcon: { type: String },
    channel: { type: String },
    images: { type: Array },
    isEmbed: { type: Boolean },
    stats: { type: Boolean },
    thumbnail: { type: String },
});

module.exports = mongoose.model("greetConfig", greetConfigSchema);
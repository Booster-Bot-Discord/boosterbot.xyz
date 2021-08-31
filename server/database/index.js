require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => mongoose.connect(process.env.MONGO_URL, { dbName: "boosterbot" });
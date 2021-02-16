const mongoose = require("mongoose");
const { mongoURL } = require("../../config.json");

mongoose.set("useCreateIndex", true);
mongoose.connect(mongoURL, { dbName: "booster", useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongodb"))
    .catch(e => console.error(e));

const userSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    visits: { type: String },
    username: { type: String },
    email: { type: String },
    ip: { type: Array }
});
const userModel = module.exports = mongoose.model("user", userSchema);

module.exports = {
    connection: async () => {
        return await mongoose.connect(mongoURL, { dbName: "booster", useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log("Connected to mongodb"))
            .catch(e => console.error(e));
    },
    userModel: userModel
}
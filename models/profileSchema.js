const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: {type: String, require: true, unique: true},
    serverId: { type: String, require: true},
    crosses: {type: Number, default: 0 },
});

const model = mongoose.model("discordlogger", profileSchema);

module.exports = model;

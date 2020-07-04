const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  picture: { type: String, required: true },
  steamId: String,
  ps4Id: String,
  xboxId: String,
  events: {
    liked: [String],
    participating: [String],
    hosting: [String]
  }
});

module.exports = mongoose.model("User", userSchema, "user");

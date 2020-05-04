const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  urls: [String],
  session: {
    hostUrl: {
      type: String,
      require: true,
      unique: true
    },
    viewerUrl: {
      type: String,
      require: true,
      unique: true
    },
    hostName: {
      type: String,
      require: true
    },
    connected: Boolean
  },
  store: { type: String, require: true }
});

module.exports = mongoose.model("Session", sessionSchema, "sessions");

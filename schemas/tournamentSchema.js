const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  url: [String],
  registrants: [String],





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

module.exports = mongoose.model("Tournament", tournamentSchema, "tournaments");

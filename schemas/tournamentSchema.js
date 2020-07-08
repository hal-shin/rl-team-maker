const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  image: {
    type: String,
    require: true,
    default:
      "https://steamcdn-a.akamaihd.net/steam/apps/252950/header_alt_assets_11.jpg?t=1585155609"
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  private: { type: Boolean, default: false },
  url: [String],
  status: String,
  streamLinks: [String],
  phase: String,
  creator: {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  people: {
    registrants: [String],
    participants: [String],
    admins: [String],
    casters: [String]
  },
  tournament: {
    board: [Object],
    bracket: [Object]
  }
});

module.exports = mongoose.model("Tournament", tournamentSchema, "tournaments");

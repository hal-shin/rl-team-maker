const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    image: {
      type: String,
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
    admins: [String],
    casters: [String],
    bracket: [Object],
    registrants: [String],
    player: {
      players: mongoose.Schema.Types.Mixed,
      playerOrder: [String]
    },
    team: {
      teams: mongoose.Schema.Types.Mixed,
      teamOrder: [String]
    },
    meta: {
      gameMode: String,
      recentSearches: [Object]
    }
  },
  { minimize: false }
);

module.exports = mongoose.model("Tournament", tournamentSchema, "tournaments");

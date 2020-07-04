const app = require("express").Router();
const {
  batchFetchPlayerData,
  fetchPlayerData
} = require("../helpers/trackerLogic");

app.get("/bulkAdd", (req, res) => {
  const { ids } = req.query || "";
  const idsArray = ids.split(",");

  batchFetchPlayerData(idsArray, newPlayers => {
    return res.json(newPlayers);
  });
});

app.get("/add", (req, res) => {
  const { id } = req.query;
  const platform = req.query.platform || "steam";

  fetchPlayerData(id, platform, newPlayer => {
    return res.json(newPlayer);
  });
});

module.exports = app;

const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

// Web scraping
const steamUrl = "https://steamcommunity.com/id/";
const trackerUrl = "https://rocketleague.tracker.network/profile/";
const currentSeason = 14;

module.exports = function(router) {
  router.get("/bulkAdd", (req, res) => {
    const { ids } = req.query || "";
    const idsArray = ids.split(",");

    batchFetchPlayerData(idsArray, newPlayers => {
      return res.json(newPlayers);
    });
  });

  router.get("/add", (req, res) => {
    const { id } = req.query;
    const platform = req.query.platform || "steam";

    fetchPlayerData(id, platform, newPlayer => {
      // console.log("NEW PLAYER:", newPlayer);
      return res.json(newPlayer);
    });
  });
};

function fetchPlayerData(id, platform, callback) {
  const newPlayer = {};

  newPlayer.id = id;
  newPlayer.platform = platform;
  newPlayer.steamProfile = steamUrl + id;
  newPlayer.trackerProfile = trackerUrl + platform + "/" + id;
  newPlayer.success = false;

  const steamReq = axios.get(newPlayer.steamProfile);
  const trackerReq = axios.get(newPlayer.trackerProfile);

  axios
    .all([steamReq, trackerReq])
    .then(
      axios.spread((...responses) => {
        const steamRes = responses[0];
        const trackerRes = responses[1];

        // steam profile pic
        const steamHtml = steamRes.data;
        const trackerHtml = trackerRes.data;

        // tracker data
        const $steam = cheerio.load(steamHtml);
        const $tracker = cheerio.load(trackerHtml);

        const profileImg = $steam(".playerAvatarAutoSizeInner > img").attr(
          "src"
        );
        const nickname = $steam(
          "body > div.responsive_page_frame.with_header > div.responsive_page_content > div.responsive_page_template_content > div > div.profile_header_bg > div > div > div > div.profile_header_centered_persona > div.persona_name > span.actual_persona_name"
        ).text();

        newPlayer.tag = nickname || id;
        newPlayer.icon =
          profileImg ||
          "https://images.idgesg.net/images/article/2018/06/steam_logo2-100691182-orig-100761992-large.3x2.jpg";
        newPlayer.ranks = {
          currentSeason: {},
          lastSeason: {}
        };

        // check if playlist table is first or second
        const playlistLocation =
          $tracker(`#season-${currentSeason} > table:nth-child(2)`).length + 1;

        const currSeasonRankTable = $tracker(
          `#season-${currentSeason} > table:nth-child(${playlistLocation}) > tbody`
        );

        const lastSeasonRankTable = $tracker(
          `#season-${currentSeason - 1} > table > tbody`
        );

        const playlists = [
          ["Ranked Duel 1v1", "ones"],
          ["Ranked Doubles 2v2", "twos"],
          ["Ranked Standard 3v3", "threes"]
        ];

        // Add current season ranks
        for (let mode of playlists) {
          const row = $tracker(
            `#season-${currentSeason} > table:nth-child(${playlistLocation}) > tbody > tr:contains(${mode[0]})`
          ).index();
          try {
            newPlayer.ranks.currentSeason[mode[1]] = parseInt(
              currSeasonRankTable
                .find(`tr:nth-child(${row + 1}) > td:nth-child(4)`)
                .text()
                .split("\n")[1]
                .replace(/,/g, "")
            );
          } catch (err) {
            newPlayer.ranks.currentSeason[mode[1]] = "0";
          }
        }

        // Add last season ranks
        for (let mode of playlists) {
          const row = $tracker(
            `#season-${currentSeason - 1} > table > tbody > tr:contains(${
              mode[0]
            })`
          ).index();
          try {
            newPlayer.ranks.lastSeason[mode[1]] = parseInt(
              lastSeasonRankTable
                .find(`tr:nth-child(${row + 1}) > td:nth-child(3)`)
                .text()
                .split("\n")[1]
                .replace(/,/g, "")
            );
          } catch (err) {
            newPlayer.ranks.lastSeason[mode[1]] = "0";
          }
        }

        if (
          newPlayer.ranks.currentSeason.twos === undefined ||
          newPlayer.ranks.currentSeason.twos === "0"
        ) {
          throw new Error("Rank not found.");
        }

        // mark player as verified by RL Tracker
        newPlayer.verified = true;
        newPlayer.success = true;

        // console.log("Adding the following player:", newPlayer);

        callback(newPlayer);
      })
    )
    .catch(errors => {
      console.error(errors);
      callback(newPlayer);
    });
}

function batchFetchPlayerData(idsArray, callback) {
  // batch add currently only supports steam as the platform
  if (idsArray.length < 1) return;

  const platform = "steam";
  const newPlayers = {};

  fetchPlayerData(idsArray[0], platform, newPlayer => {
    newPlayers[idsArray[0]] = newPlayer;
    if (process.env.NODE_ENV === "development") {
      console.log("Adding:", idsArray[0]);
    }
  });

  for (let i = 1; i < idsArray.length; i++) {
    const id = idsArray[i];
    setTimeout(() => {
      fetchPlayerData(id, platform, newPlayer => {
        if (process.env.NODE_ENV === "development") console.log("Adding:", id);
        newPlayers[id] = newPlayer;
      });
    }, i * 5000); // 5 seconds delay per request to not overload tracker server
  }

  setTimeout(() => {
    callback(newPlayers);
  }, idsArray.length * 5000); // wait 5 seconds after last fetch then callback
}

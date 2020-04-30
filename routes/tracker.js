const router = require("express").Router();

// Web scraping
const steamUrl = "https://steamcommunity.com/id/";
const trackerUrl = "https://rocketleague.tracker.network/profile/";
const axios = require("axios");
const cheerio = require("cheerio");

const currentSeason = 14;

router.get("/:id", (req, res) => {
  const { id } = req.params;
  let { platform } = req.query || "steam";

  const steamProfile = steamUrl + id;
  const trackerProfile = trackerUrl + platform + "/" + id;

  const steamReq = axios.get(steamProfile);
  const trackerReq = axios.get(trackerProfile);

  axios
    .all([steamReq, trackerReq])
    .then(
      axios.spread((...responses) => {
        const steamRes = responses[0];
        const trackerRes = responses[1];

        // steam profile pic
        const steamHtml = steamRes.data;
        const $steam = cheerio.load(steamHtml);
        const profileImg = $steam(".playerAvatarAutoSizeInner > img").attr(
          "src"
        );
        const nickname = $steam(
          "body > div.responsive_page_frame.with_header > div.responsive_page_content > div.responsive_page_template_content > div > div.profile_header_bg > div > div > div > div.profile_header_centered_persona > div.persona_name > span.actual_persona_name"
        ).text();

        // tracker data
        const trackerHtml = trackerRes.data;
        const $tracker = cheerio.load(trackerHtml);

        const newPlayer = {
          id: id,
          tag: nickname || id,
          icon:
            profileImg ||
            "https://images.idgesg.net/images/article/2018/06/steam_logo2-100691182-orig-100761992-large.3x2.jpg",
          ranks: {
            currentSeason: {},
            lastSeason: {},
          },
          platform,
          steamUrl: steamProfile,
          trackerUrl: trackerProfile,
        };

        const currSeasonRankTable = $tracker(
          `#season-${currentSeason} > table:nth-child(2) > tbody`
        );

        const lastSeasonRankTable = $tracker(
          `#season-${currentSeason - 1} > table > tbody`
        );

        const playlists = [
          ["Ranked Duel 1v1", "ones"],
          ["Ranked Doubles 2v2", "twos"],
          ["Ranked Standard 3v3", "threes"],
        ];

        // Add current season ranks
        for (let mode of playlists) {
          const row = $tracker(
            `#season-${currentSeason} > table:nth-child(2) > tbody > tr:contains(${mode[0]})`
          ).index();
          newPlayer.ranks.currentSeason[mode[1]] = parseInt(
            currSeasonRankTable
              .find(`tr:nth-child(${row + 1}) > td:nth-child(4)`)
              .text()
              .split("\n")[1]
              .replace(/,/g, "")
          );
        }

        // Add last season ranks
        for (let mode of playlists) {
          const row = $tracker(
            `#season-${currentSeason - 1} > table > tbody > tr:contains(${
              mode[0]
            })`
          ).index();
          newPlayer.ranks.lastSeason[mode[1]] = parseInt(
            lastSeasonRankTable
              .find(`tr:nth-child(${row + 1}) > td:nth-child(3)`)
              .text()
              .split("\n")[1]
              .replace(/,/g, "")
          );
        }

        // newPlayer.ranks.lastSeason.ones = parseInt(
        //   lastSeasonRankTable
        //     .find(`tr:nth-child(${mode[1] - 1 + onesIndex}) > td:nth-child(3)`)
        //     .text()
        //     .split("\n")[1]
        //     .replace(/,/g, "")
        // );
        console.log("Adding the following player:", newPlayer);

        if (newPlayer.ranks.currentSeason.twos === undefined) {
          throw new Error("Rank not found.");
        }

        // mark player as verified by RL Tracker
        newPlayer.verified = true;

        res.json({ newPlayer });
      })
    )
    .catch((errors) => {
      console.error(errors);
    });
});

module.exports = router;

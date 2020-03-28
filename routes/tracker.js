const router = require("express").Router();

// Web scraping
const steamUrl = "https://steamcommunity.com/id/";
const trackerUrl = "https://rocketleague.tracker.network/profile/";
const axios = require("axios");
const cheerio = require("cheerio");

const currentSeason = 14;

router.get("/:platform/:id", (req, res) => {
  console.log("Searching for a new player...");
  const { id, platform } = req.params;

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
            lastSeason: {}
          },
          steamUrl: steamProfile,
          trackerUrl: trackerProfile
        };

        const currSeasonRankTable = $tracker(
          `#season-${currentSeason} > table:nth-child(2) > tbody`
        );

        const lastSeasonRankTable = $tracker(
          `#season-${currentSeason - 1} > table > tbody`
        );

        const playlists = [
          ["ones", 2],
          ["twos", 3],
          ["threes", 5]
        ];

        // onesIndex finds the index of the row at which 1v1 appears.
        // This position changes per player for some unknown reason.
        let onesIndex =
          $tracker(
            `#season-${currentSeason - 1} > table > tbody > tr:contains(2v2)`
          ).index() - 1;

        for (let mode of playlists) {
          newPlayer.ranks.currentSeason[mode[0]] = parseInt(
            currSeasonRankTable
              .find(`tr:nth-child(${mode[1]}) > td:nth-child(4)`)
              .text()
              .split("\n")[1]
              .replace(/,/g, "")
          );
          newPlayer.ranks.lastSeason[mode[0]] = parseInt(
            lastSeasonRankTable
              .find(
                `tr:nth-child(${mode[1] - 1 + onesIndex}) > td:nth-child(3)`
              )
              .text()
              .split("\n")[1]
              .replace(/,/g, "")
          );
        }

        console.log("Adding the following player:", newPlayer);

        if (newPlayer.ranks.currentSeason.twos === undefined) {
          throw new Error("Rank not found.");
        }

        res.json({ newPlayer });
      })
    )
    .catch(errors => {
      console.error(errors);
    });
});

module.exports = router;

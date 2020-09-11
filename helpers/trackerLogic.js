// Web scraping
const steamUrl = "https://steamcommunity.com/id/";
const trackerUrl =
  "https://api.tracker.gg/api/v2/rocket-league/standard/profile/";
const axios = require("axios");
const cheerio = require("cheerio");

const currentSeason = 14;

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
        // const trackerHtml = trackerRes.data;
        const playerData = trackerRes.data.data.segments;

        // tracker data
        const $steam = cheerio.load(steamHtml);

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

        const playlists = [
          ["Ranked Duel 1v1", "ones"],
          ["Ranked Doubles 2v2", "twos"],
          ["Ranked Standard 3v3", "threes"]
        ];

        playlists.forEach(playlist => {
          const rightSegment = playerData.filter(segment => {
            return (
              segment.metadata.name === playlist[0] &&
              segment.attributes.season === currentSeason
            );
          });

          newPlayer.ranks.currentSeason[playlist[1]] =
            rightSegment[0].stats.rating.value;
        });

        newPlayer.verified = true;
        newPlayer.success = true;

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
    console.log("Adding:", idsArray[0]);
  });

  for (let i = 1; i < idsArray.length; i++) {
    const id = idsArray[i];
    setTimeout(() => {
      fetchPlayerData(id, platform, newPlayer => {
        newPlayers[id] = newPlayer;
        console.log("Adding:", id);
      });
    }, i * 5000);
  }

  setTimeout(() => {
    callback(newPlayers);
  }, idsArray.length * 5000);
}

exports.fetchPlayerData = fetchPlayerData;
exports.batchFetchPlayerData = batchFetchPlayerData;

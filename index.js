const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

const steamUrl = "https://steamcommunity.com/id/";
const trackerUrl = "https://rocketleague.tracker.network/profile/steam/";
const axios = require("axios");
const cheerio = require("cheerio");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// app.get("/", (req, res) => {
//   console.log("Requested!");
//   res.send("You've reached the backend.");
// });

app.get("/search/:id", (req, res) => {
  const id = req.params.id;

  const steamProfile = steamUrl + id;
  const trackerProfile = trackerUrl + id;

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
        console.log("Profile:", profileImg);

        // tracker data
        const trackerHtml = trackerRes.data;
        const $tracker = cheerio.load(trackerHtml);
        const rankTable = $tracker("#season-13 > table:nth-child(2) > tbody");

        const newPlayer = {
          id: id,
          tag: nickname || id,
          icon:
            profileImg ||
            "https://images.idgesg.net/images/article/2018/06/steam_logo2-100691182-orig-100761992-large.3x2.jpg",
          ranks: {},
          steamUrl: steamProfile,
          trackerUrl: trackerProfile
        };

        newPlayer.ranks.ones = parseInt(
          rankTable
            .find("tr:nth-child(2) > td:nth-child(4)")
            .text()
            .split("\n")[1]
            .replace(/,/g, "")
        );
        newPlayer.ranks.twos = parseInt(
          rankTable
            .find("tr:nth-child(3) > td:nth-child(4)")
            .text()
            .split("\n")[1]
            .replace(/,/g, "")
        );
        newPlayer.ranks.threes = parseInt(
          rankTable
            .find("tr:nth-child(5) > td:nth-child(4)")
            .text()
            .split("\n")[1]
            .replace(/,/g, "")
        );
        console.log(newPlayer);
        res.json({ newPlayer });
      })
    )
    .catch(errors => {
      console.error(errors);
    });
});

// axios(steamUrl + id)
//   .then(steamResponse => {
//     let html = response.data;
//     let $ = cheerio.load(html);
//     const profileImg = $(
//       "body > div.responsive_page_frame.with_header > div.responsive_page_content > div.responsive_page_template_content > div > div.profile_header_bg > div > div > div > div.playerAvatar.profile_header_size.offline > div > img"
//     ).attr("src");
//
//   })

// axios(trackerUrl + id)
//   .then(response => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const rankTable = $("#season-13 > table:nth-child(2) > tbody");
//
//     const newPlayer = {
//       id: id,
//       tag: id,
//       icon: profileImg || "https://images.idgesg.net/images/article/2018/06/steam_logo2-100691182-orig-100761992-large.3x2.jpg",
//       ranks: {}
//     };
//
//     newPlayer.ranks.ones = rankTable
//       .find("tr:nth-child(2) > td:nth-child(4)")
//       .text()
//       .split("\n")[1];
//     newPlayer.ranks.twos = rankTable
//       .find("tr:nth-child(3) > td:nth-child(4)")
//       .text()
//       .split("\n")[1];
//     newPlayer.ranks.threes = rankTable
//       .find("tr:nth-child(5) > td:nth-child(4)")
//       .text()
//       .split("\n")[1];
//
//     console.log(newPlayer);
//     res.json({newPlayer});
//
//   })
//   .catch(console.error);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

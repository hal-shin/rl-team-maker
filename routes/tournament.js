const app = require("express").Router();
const checkJwt = require("../middlewares/jwt");
const Tournament = require("../schemas/tournamentSchema");
const User = require("../schemas/userSchema");

app.get("/", (req, res) => {
  const { tournamentId, userId } = req.query;

  if (!tournamentId)
    res.status(400).send({ message: "Please include tournament ID" });
  Tournament.findById(tournamentId, (err, foundTourney) => {
    if (!err) {
      if (!foundTourney)
        res.status(400).send({ message: "Tourney doesn't exist" });

      if (userId && foundTourney.admins.includes(userId)) {
        foundTourney._doc.isAdmin = true;
      } else {
        foundTourney._doc.isAdmin = false;
      }

      res.send(foundTourney);
    } else {
      console.log("Error:", err);
    }
  });
});

app.get("/all", (req, res) => {
  Tournament.find({ private: false }, (err, foundTourneys) => {
    if (!err) {
      if (!foundTourneys)
        res.status(404).send({ message: "No tourneys found" });
      res.send(foundTourneys);
    } else {
      res.status(500).send({ message: "Something went wrong" });
    }
  });
});

app.post("/new", checkJwt, (req, res) => {
  const { formData, user } = req.body;

  if (!user)
    return res.status(400).send({ message: "You must be logged in first." });
  if (!formData)
    return res.status(400).send({ message: "Form data is missing." });

  Tournament.findOne({ title: formData.title }, (err, foundTourney) => {
    if (err) {
      console.log(err);
    } else {
      if (!foundTourney) {
        Tournament.create(
          {
            title: formData.title,
            description: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            creator: {
              id: user._id,
              name: user.username
            },
            player: {
              players: {},
              playerOrder: []
            },
            team: {
              teams: {},
              teamOrder: []
            },
            meta: {
              gameMode: "twos",
              recentSearches: [
                { query: "thewarriorofblue", platform: "steam" },
                { query: "sql_lall", platform: "steam" },
                { query: "wundero", platform: "steam" }
              ]
            },
            admins: [user._id]
          },
          (err, createdTourney) => {
            if (err) return console.log("Tourney creation failed.");

            User.findByIdAndUpdate(
              user._id,
              {
                $push: { "events.hosting": createdTourney._id }
              },
              (err, foundUser) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(400)
                    .send({ message: "couldn't add to host array" });
                }
              }
            );

            return console.log(
              "Tournament created successfully:",
              createdTourney
            );
          }
        );
      } else {
        // console.log("Found tourney:", foundTourney);
        return res.status(400).send({ message: "Tournament already exists." });
      }
    }
  });
});

app.post("/update", checkJwt, (req, res) => {
  const { userid } = req.headers;
  const { event } = req.body;
  if (!userid) res.send(400).send({ message: "Please provide userid" });
  Tournament.findOneAndUpdate(
    { _id: event._id, admins: { $in: userid } },
    event,
    { new: true },
    (err, updatedTourney) => {
      // console.log("UPDATED TOURNEY:", updatedTourney);
      res.send(updatedTourney);
    }
  );
});

module.exports = app;

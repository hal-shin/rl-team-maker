const app = require("express").Router();
const checkJwt = require("../middlewares/jwt");
const Tournament = require("../schemas/tournamentSchema");

app.get("/", (req, res) => {
  const { tournamentId } = req.query;
  if (!tournamentId)
    res.status(400).send({ message: "Please include tournament ID" });
  Tournament.findById(tournamentId, (err, foundTourney) => {
    if (!err) {
      if (!foundTourney)
        res.status(400).send({ message: "Tourney doesn't exist" });
      res.send(foundTourney);
    } else {
      console.log("Error:", err);
    }
  });
});

app.get("/all", (req, res) => {
  Tournament.find({}, (err, foundTourneys) => {
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

  console.log("FORM DATA:", formData);
  console.log("USER:", user);

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
            }
          },
          (err, createdTourney) => {
            if (err) return console.log("Tourney creation failed.");
            return console.log(
              "Tournament created successfully:",
              createdTourney
            );
          }
        );
      } else {
        console.log("Found tourney:", foundTourney);
        return res.status(400).send({ message: "Tournament already exists." });
      }
    }
  });
});

module.exports = app;

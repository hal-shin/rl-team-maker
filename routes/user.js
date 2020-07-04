const app = require("express").Router();
const checkJwt = require("../middlewares/jwt");
const User = require("../schemas/userSchema");

app.get("/", (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).send({ message: "User ID is missing" });

  User.findById(userId, (err, foundUser) => {
    if (err) return res.status(404).send({ message: "User not found" });
    return res.json(foundUser);
  });
});

app.post("/", checkJwt, (req, res) => {
  const { user } = req.body;

  if (!user || user.sub.length !== 30) {
    res.status(400);
    return res.send({ message: "User ID is missing or incorrect" });
  }

  const userId = user.sub.slice(6);

  User.findById(userId, (err, foundUser) => {
    if (err || !foundUser) {
      User.create(
        {
          _id: userId,
          email: user.email,
          picture: user.picture
        },
        (err, createdUser) => {
          if (err) return console.log("User creation failed.");
          return console.log("User successfully created:", createdUser);
        }
      );
    } else {
      return res.send(foundUser);
    }
  });
});

app.post("/like", checkJwt, (req, res) => {
  const { userId, eventId } = req.query;

  if (!userId || !eventId)
    return res.status(400).send({ message: "Missing userId or eventId" });

  User.findByIdAndUpdate(
    userId,
    { $push: { "events.liked": eventId } },
    (err, updatedUser) => {
      if (err || !updatedUser) {
        console.log("ERROR:", err);
        return res.status(404).send({ message: "Something went wrong" });
      }
      return res.send({ success: true });
    }
  );
});

app.post("/unlike", checkJwt, (req, res) => {
  const { userId, eventId } = req.query;

  if (!userId || !eventId)
    return res.status(400).send({ message: "Missing userId or eventId" });

  User.findByIdAndUpdate(
    userId,
    { $pull: { "events.liked": eventId } },
    (err, updatedUser) => {
      if (err || !updatedUser)
        return res.status(404).send({ message: "Something went wrong" });
      return res.send({ success: true });
    }
  );
});

module.exports = app;

const app = require("express").Router();
const randomString = require("randomstring");
const Session = require("../schemas/sessionSchema");

// Retrieve session ID based on given URL
app.get("/session", (req, res) => {
  let isViewer = true;
  const sessionUrl = req.query.url;

  if (!sessionUrl) {
    res.status(400);
    res.send("Please input a session URL");
  } else if (sessionUrl) {
    Session.findOne({ urls: sessionUrl }, (err, foundSession) => {
      if (err) {
        res.status(404);
        res.send("No such session found");
      } else {
        if (foundSession.session.hostUrl === sessionUrl) isViewer = false;

        const outputSession = {
          ...foundSession.session,
          id: foundSession._id,
          isViewer,
          isHost: !isViewer
        };

        res.json(outputSession);
      }
    });
  }
});

app.post("/session", (req, res) => {
  let { storeData, hostName } = req.body;

  hostName = hostName || "Admin";

  const newHostUrl = randomString.generate({
    length: 8,
    charset: "alphabetic"
  });
  const newViewerUrl = randomString.generate({
    length: 8,
    charset: "alphabetic"
  });

  const newSession = new Session({
    urls: [newHostUrl, newViewerUrl],
    session: {
      hostUrl: newHostUrl,
      viewerUrl: newViewerUrl,
      connected: true,
      hostName
    },
    store: JSON.stringify(storeData)
  });

  newSession.save((err, doc) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send("something went wrong.");
    } else {
      res.json(doc);
    }
  });
});

module.exports = app;

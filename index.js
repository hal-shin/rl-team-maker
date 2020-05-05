require("dotenv").config();
const _ = require("lodash");
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
const randomString = require("randomstring");
const port = process.env.PORT || 5000;
const io = require("socket.io")(server);
const tracker = require("./routes/tracker");
const Session = require("./schemas/sessionSchema");
const blankBoard = require("./emptyBoardTemplate");

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

// app configs
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static("client/build"));

mongoose.connect(
  process.env.DATABASE,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err, connection) => {
    if (err) console.log("Database error:", err);
    else {
      console.log("Successful database connection");
    }
  }
);

// socket logic
io.on("connection", client => {
  client.emit("general-connect");

  client.on("join-session", payload => {
    const { sessionUrl, newSessionId } = payload;
    console.log("Someone joined", sessionUrl);
    client.join(sessionUrl);

    Session.findById(newSessionId, (err, foundSession) => {
      if (err) return console.log("SESSION NOT FOUND");
      else {
        const newStore = JSON.parse(foundSession.store);
        console.log("TRIGGER 1");
        client.emit("update-store", newStore);
      }
    });
  });

  client.on("store-changed", payload => {
    console.log("Store change triggered...");
    const { sessionUrl, sessionId, newStore } = payload;
    // check if emitter is the host
    Session.findById(sessionId, (err, foundSession) => {
      if (err) return console.log("SESSION NOT FOUND");
      else {
        const oldStore = JSON.parse(foundSession.store);

        console.log("HOST SESSION URL:", oldStore.session.hostUrl);
        if (oldStore.session.hostUrl === sessionUrl) {
          // check if stores are different, if so, update
          if (!_.isEqual(oldStore, newStore)) {
            console.log("Stores are different. Updating...");
            console.log("OLD STORE:", oldStore);
            console.log("NEW STORE:", newStore);

            Session.findByIdAndUpdate(
              sessionId,
              { store: JSON.stringify(newStore) },
              err => {
                if (err) console.log("Session data update failed.");
              }
            );

            console.log("TRIGGER 2");

            client
              .to(oldStore.session.viewerUrl)
              .emit("update-store", newStore);
            client.to(oldStore.session.hostUrl).emit("update-store", newStore);
          }
        }
      }
    });
  });
});

// Tracker route
app.use("/search", tracker);

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
        // console.log("FOUND SESSION:", foundSession);
        if (foundSession.session.hostUrl === sessionUrl) isViewer = false;
        res.json({ sessionId: foundSession._id, isViewer });
      }
    });
  }
});

app.post("/session", (req, res) => {
  let { newBoard, storeData, boardData, hostName } = req.body;

  hostName = hostName || "Admin";
  newBoard = newBoard || false;

  const newHostUrl = randomString.generate({
    length: 8,
    charset: "alphabetic"
  });
  const newViewerUrl = randomString.generate({
    length: 8,
    charset: "alphabetic"
  });

  if (newBoard === true) {
    boardData = blankBoard;
  }

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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

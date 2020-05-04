const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const randomString = require("randomstring");
const port = process.env.PORT || 5000;
const io = require("socket.io")(server);
const tracker = require("./routes/tracker");

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sessions = {};

io.on("connection", client => {
  client.emit("general-connect");

  client.on("join-session", payload => {
    const { sessionUrl, newSessionId } = payload;
    console.log("Someone joined", sessionUrl);
    client.join(sessionUrl);
    client.emit("update-board", sessions[newSessionId].store.board);
    client.emit("update-session", sessions[newSessionId].session);
  });

  client.on("board-changed", payload => {
    const { sessionUrl, sessionId, newBoard } = payload;
    // check if emitter is the host
    if (sessions[sessionId]) {
      if (sessionUrl === sessions[sessionId].session.hostUrl) {
        sessions[sessionId].store.board = newBoard;
        client
          .to(sessions[sessionId].session.viewerUrl)
          .emit("update-board", newBoard);
      }
    }
  });
});

// Tracker route
app.use("/search", tracker);

// Retrieve session ID based on given URL
app.get("/session/get", (req, res) => {
  let foundId;
  let isViewer = true;
  const sessionUrl = req.query.url;

  if (!sessionUrl) {
    res.status(400);
    res.send("Please input a session URL");
  } else if (sessionUrl) {
    const openSessions = Object.keys(sessions);

    openSessions.forEach(id => {
      if (sessions[id].urls.includes(sessionUrl)) {
        foundId = id;
        if (sessions[id].session.hostUrl === sessionUrl) isViewer = false;
      }
    });

    if (foundId) {
      res.json({ sessionId: foundId, isViewer });
    } else {
      res.status(404);
      res.send("No such session found");
    }
  }
});

app.post("/session/create", (req, res) => {
  try {
    let { newBoard, boardData, hostName } = req.body;

    hostName = hostName || "Admin";
    newBoard = newBoard || false;

    const newSessionId = randomString.generate({
      length: 8,
      charset: "alphabetic"
    });
    const newHostUrl = randomString.generate({
      length: 8,
      charset: "alphabetic"
    });
    const newViewerUrl = randomString.generate({
      length: 8,
      charset: "alphabetic"
    });

    sessions[newSessionId] = {
      urls: [newHostUrl, newViewerUrl],
      session: {
        sessionId: newSessionId,
        hostUrl: newHostUrl,
        viewerUrl: newViewerUrl,
        connected: true,
        hostName
      },
      store: {
        board: {}
      }
    };

    if (newBoard && newBoard === true) {
      sessions[newSessionId].store = {
        board: {
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
            recentSearches: []
          }
        }
      };
    } else {
      sessions[newSessionId].store.board = boardData;
    }

    // console.log("CREATING:", sessions[newSessionId].store.board.team.teams);

    res.json(sessions[newSessionId]);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send("something went wrong.");
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

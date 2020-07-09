require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const io = require("socket.io")(server);
const SocketLogic = require("./sockets");

const trackerRoutes = require("./routes/tracker");
const apiRoutes = require("./routes/api");
const sessionRoutes = require("./routes/session");
const userRoutes = require("./routes/user");
const tournamentRoutes = require("./routes/tournament");

// app configs
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE
    : process.env.TEST_DATABASE,
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

  SocketLogic.session(client);
  SocketLogic.chat(client);
});

// Tracker route
app.use("/", sessionRoutes);
app.use("/search", trackerRoutes);
app.use("/api", apiRoutes);
app.use("/user", userRoutes);
app.use("/tournament", tournamentRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

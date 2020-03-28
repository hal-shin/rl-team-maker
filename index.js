const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const port = process.env.PORT || 5000;
const io = require("socket.io")(server);
const tracker = require("./routes/tracker");

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
// const server = app.listen(port, () =>
//   console.log(`Server is running on port ${PORT}`)
// );

// const io = require("socket.io")(server, {
//   transports: ["websocket", "polling"]
// });

const users = {};
const rooms = {};

const chat = io.of("/chat").on("connection", client => {
  users[client.id] = {};
  client.emit("connect");
  console.log("A user connected!");

  client.on("sendMessage", message => {
    chat.to(users[client.id].room).emit("message", {
      text: message,
      user: users[client.id]
    });
  });

  client.on("initialize", data => {
    console.log("Adding new user...");
    const user = {
      name: data.username,
      id: client.id,
      room: data.room
    };
    users[client.id] = user;
    client.join(data.room);
    client.emit("connected", user);
    client.emit("users", Object.values(users));
  });
  client.on("disconnect", () => {
    console.log("A user disconnected.");
    delete users[client.id];
    client.emit("disconnected", client.id);
  });
});

// Tracker route
app.use("/search", tracker);

// Websocket api
app.get("/create/:room", (req, res) => {
  const room = req.params.room;
  if (Object.keys(rooms).includes(room)) {
    res.status(409);
    res.send("Room already exists");
  } else {
    rooms[room] = {
      users: []
    };
    res.send("Room created");
  }
});

app.get("/join/:room", (req, res) => {
  const room = req.params.room;
  if (Object.keys(rooms).includes(room)) {
    res.send("Room exists");
  } else {
    res.status(404);
    res.send("Room does not exist");
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

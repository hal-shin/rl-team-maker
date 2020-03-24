const router = require("express").Router();

// Websocket
const server = require("http").createServer();

router.get("/:room", (req, res) => {
  const room = req.params.room;
  activeRooms.push(room);
  console.log(`Request received to open ${room}.`);


  res.send("Room has been created.");
});

server.listen(8000);

module.exports = router;

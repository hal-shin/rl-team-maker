const chat = (io, client) => {
  client.on("connect-chat", payload => {
    client.join(payload.room);
    console.log(`${payload.username} joined ${payload.room}`);
  });

  client.on("sendMessage", payload => {
    client.to(payload.room).emit("message", payload.message);
  });
};

exports.chat = chat;

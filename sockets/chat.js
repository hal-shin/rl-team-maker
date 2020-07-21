const chat = (io, client) => {
  client.on("connect-chat", payload => {
    client.join(payload.room);
    console.log(`${payload.username} joined ${payload.room}`);
  });

  client.on("sendMessage", payload => {
    const { message, room } = payload;
    client.to(room).emit("message", { room, message });
  });
};

exports.chat = chat;

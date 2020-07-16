const chat = client => {
  client.on("connect-chat", payload => {
    console.log(`${payload.username} joined the chat`);
  });

  client.on("sendMessage", message => {
    client.emit("message", message);
  });
};

exports.chat = chat;

const chat = client => {
  client.on("connect-chat", payload => {
    console.log(`${payload.username} joined the chat`);
  });
};

exports.chat = chat;

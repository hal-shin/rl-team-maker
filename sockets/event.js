const event = (io, client) => {
  client.on("connect-event", tournamentId => {
    client.join(tournamentId);
  });

  client.on("disconnect-event", tournamentId => {
    client.leave(tournamentId);
  });

  client.on("event-update", payload => {
    client.to(payload.event._id).emit("event-update", payload.event);
  });
};

const event = (io, client) => {
  client.on("connect-event", tournamentId => {
    console.log("A user is joining", tournamentId);
    client.join(tournamentId);
  });

  client.on("disconnect-event", tournamentId => {
    console.log("A user is leaving", tournamentId);
    client.leave(tournamentId);
  });

  client.on("event-update", payload => {
    console.log("Receiving event update:", payload.event);
    client.to(payload.event._id).emit("event-update", payload.event);
  });

  client.on("notification", payload => {
    client.to(payload._id).emit("messenger", payload);
  });
};

exports.event = event;

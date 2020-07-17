const Session = require("../schemas/sessionSchema");
const _ = require("lodash");

const session = (io, client) => {
  client.on("join-session", payload => {
    const { sessionUrl, newSessionId } = payload;
    console.log("Someone joined", sessionUrl);
    client.join(sessionUrl);

    Session.findById(newSessionId, (err, foundSession) => {
      if (err) return console.log(`Session (${sessionUrl}) not found.`);
      else {
        const newStore = JSON.parse(foundSession.store);
        client.emit("update-store", newStore);
      }
    });
  });

  client.on("store-changed", payload => {
    const { sessionUrl, sessionId, newStore } = payload;
    // check if emitter is the host
    Session.findById(sessionId, (err, foundSession) => {
      if (err) return console.log(`Session (${sessionUrl}) not found.`);
      else {
        if (foundSession.session.hostUrl === sessionUrl) {
          // check if stores are different, if so, update
          const oldStore = JSON.parse(foundSession.store);
          if (!_.isEqual(oldStore, newStore)) {
            Session.findByIdAndUpdate(
              sessionId,
              {
                store: JSON.stringify(newStore)
              },
              err => {
                if (err) console.log("Session data update failed.");
              }
            );

            client
              .to(foundSession.session.viewerUrl)
              .emit("update-store", newStore);
            client
              .to(foundSession.session.hostUrl)
              .emit("update-store", newStore);
          }
        }
      }
    });
  });
};

exports.session = session;

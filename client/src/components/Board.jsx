import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

import { SocketContext } from "../contexts/SocketContext";
import { timeoutPromise } from "../helpers/playerFetchLogic";
import { setStore } from "../actions/storeActions";
import TeamMaker from "./team-maker/TeamMaker";

var socketTimeout;

export default function Board() {
  const dispatch = useDispatch();
  let { sessionUrl } = useParams();
  const currentStore = useSelector(state => state);
  const { session, setSession } = useContext(SocketContext);
  const [showing, setShowing] = useState("team-maker");

  // Initial load session data if url isn't root
  useEffect(() => {
    if (sessionUrl) {
      setShowing("loading");

      // fetch sessionID
      timeoutPromise(1000 * 10, fetch(`/session?url=${sessionUrl}`))
        .then(res => res.json())
        .then(data => {
          setSession(data);
          setShowing("team-maker");

          socket.emit("join-session", {
            sessionUrl,
            newSessionId: data.id
          });
        })
        .catch(err => {
          console.log(err);
          setShowing("no-session-found");
        });

      socket.on("update-store", newStore => {
        dispatch(setStore(newStore));
      });
    }
  }, [sessionUrl, dispatch, setSession]);

  // Ping store changes to socket if host
  useEffect(() => {
    clearTimeout(socketTimeout);
    if (session.id && session.connected && session.isHost) {
      socketTimeout = setTimeout(() => {
        socket.emit("store-changed", {
          sessionUrl,
          sessionId: session.id,
          newStore: currentStore
        });
      }, 2000);
    }
  }, [currentStore, session, sessionUrl]);

  const renderBoard = () => {
    if (showing === "team-maker") {
      return <TeamMaker />;
    } else if (showing === "loading") {
      return <p>Loading...</p>;
    } else if (showing === "no-session-found") {
      return <p>No session found.</p>;
    }
  };

  return renderBoard();
}

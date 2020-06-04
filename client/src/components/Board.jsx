import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

import { SocketContext } from "../contexts/SocketContext";
import { timeoutPromise } from "../helpers/playerFetchLogic";
import { setStore } from "../actions/storeActions";
import TeamMaker from "./team-maker/TeamMaker";
import { ThemeContext } from "../contexts/ThemeContext";
import TournamentBracket from "./tournament/TournamentBracket";
import Dialogs from "./dialogs/Dialogs";

var socketTimeout;

export default function Board() {
  const dispatch = useDispatch();
  let { sessionUrl } = useParams();
  const currentStore = useSelector(state => state);
  const { session, setSession } = useContext(SocketContext);
  const { boardShowing, setBoardShowing } = useContext(ThemeContext);

  // Initial load session data if url isn't root
  useEffect(() => {
    if (sessionUrl) {
      setBoardShowing("loading");

      // fetch sessionID
      timeoutPromise(1000 * 10, fetch(`/session?url=${sessionUrl}`))
        .then(res => res.json())
        .then(data => {
          setSession(data);
          setBoardShowing("team-maker");

          socket.emit("join-session", {
            sessionUrl,
            newSessionId: data.id
          });
        })
        .catch(err => {
          console.log(err);
          setBoardShowing("no-session-found");
        });

      socket.on("update-store", newStore => {
        dispatch(setStore(newStore));
      });
    }
  }, [sessionUrl, dispatch, setSession, setBoardShowing]);

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
      }, 1000);
    }
  }, [currentStore, session, sessionUrl]);

  const renderBoard = () => {
    switch (boardShowing) {
      case "team-maker":
        return <TeamMaker />;
      case "tournament":
        return <TournamentBracket />;
      case "loading":
        return <p>Loading...</p>;
      case "no-session-found":
        return <p>No session found.</p>;
      default:
        return <></>;
    }
  };

  return (
    <div>
      {renderBoard()}
      <Dialogs />
    </div>
  );
}

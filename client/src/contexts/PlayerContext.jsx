import React, { createContext, useEffect, useState } from "react";
import initialData from "../initialData";

export const PlayerContext = createContext();

export function PlayerProvider(props) {
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("rl-players")) || initialData.players
  );
  const [playerOrder, setPlayerOrder] = useState(
    JSON.parse(localStorage.getItem("rl-playerOrder")) ||
      initialData.playerOrder
  );

  return (
    <PlayerContext.Provider
      value={{ players, setPlayers, playerOrder, setPlayerOrder }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
}

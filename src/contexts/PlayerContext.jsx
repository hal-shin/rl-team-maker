import React, { createContext, useState } from "react";
import initialData from "../initialData";

export const PlayerContext = createContext();

export function PlayerProvider(props) {
  const [players, setPlayers] = useState(initialData.players);
  const [playerOrder, setPlayerOrder] = useState(initialData.playerOrder);

  return (
    <PlayerContext.Provider
      value={{ players, setPlayers, playerOrder, setPlayerOrder }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
}

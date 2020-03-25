import React, { createContext, useState } from "react";
import initialData from "../initialData";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const PlayerContext = createContext();

export function PlayerProvider(props) {
  const [players, setPlayers] = useLocalStorageState(
    "rl-players",
    initialData.players
  );
  const [playerOrder, setPlayerOrder] = useLocalStorageState(
    "rl-playerOrder",
    initialData.playerOrder
  );
  // const [players, setPlayers] = useState(
  //   JSON.parse(localStorage.getItem("rl-players")) || initialData.players
  // );
  // const [playerOrder, setPlayerOrder] = useState(
  //   JSON.parse(localStorage.getItem("rl-playerOrder")) ||
  //     initialData.playerOrder
  // );

  return (
    <PlayerContext.Provider
      value={{ players, setPlayers, playerOrder, setPlayerOrder }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
}

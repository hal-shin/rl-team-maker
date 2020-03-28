import React, { createContext, useEffect, useState } from "react";
import initialData from "../initialData";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const PlayerContext = createContext();

export function PlayerProvider(props) {
  const [players, setPlayers] = useLocalStorageState(
    "rl-players",
    initialData.players
  );
  const [playerOrder, setPlayerOrder] = useState(
    JSON.parse(localStorage.getItem("rl-playerOrder")) ||
      initialData.playerOrder
  );
  const [
    recentSearches,
    setRecentSearches
  ] = useLocalStorageState("rl-recentSearches", [
    "thewarriorofblue",
    "sql_lall",
    "wundero"
  ]);

  useEffect(() => {
    const defaultPlayerOrder = Object.keys(players);
    localStorage.setItem("rl-playerOrder", JSON.stringify(defaultPlayerOrder));
  }, [players]);

  return (
    <PlayerContext.Provider
      value={{
        players,
        setPlayers,
        playerOrder,
        setPlayerOrder,
        recentSearches,
        setRecentSearches
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
}

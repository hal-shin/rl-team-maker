export const setEvent = newEvent => ({
  type: "SET_EVENT",
  newEvent
});

export const setPlayerOrder = newPlayerOrder => ({
  type: "SET_PLAYER_ORDER",
  newPlayerOrder
});

export const setPlayers = newPlayers => ({
  type: "SET_PLAYERS",
  newPlayers
});

export const setTeams = newTeams => ({
  type: "SET_TEAMS",
  newTeams
});

export const setTeamOrder = newTeamOrder => ({
  type: "SET_TEAM_ORDER",
  newTeamOrder
});

export const setGameMode = newGameMode => ({
  type: "SET_GAME_MODE",
  newGameMode
});

export const setRecentSearches = newRecentSearches => ({
  type: "SET_RECENT_SEARCHES",
  newRecentSearches
});

export const sortTeams = (newTeams, newTeamOrder, newPlayerOrder) => ({
  type: "SORT_TEAMS",
  newTeams,
  newTeamOrder,
  newPlayerOrder
});

export const reset = () => ({
  type: "RESET"
});

export const setPhase = newPhase => ({
  type: "SET_PHASE",
  newPhase
});

export const setRoundRobin = () => ({
  type: "SET_ROUND_ROBIN"
});

export const setNotes = (gameId, newNotes) => ({
  type: "SET_NOTES",
  gameId,
  newNotes
});

export const setScore = (gameId, side, newScore) => ({
  type: "SET_SCORE",
  gameId,
  side,
  newScore
});

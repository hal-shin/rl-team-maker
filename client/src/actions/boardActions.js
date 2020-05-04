export const setBoard = newBoard => ({
  type: "SET_BOARD",
  newBoard
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

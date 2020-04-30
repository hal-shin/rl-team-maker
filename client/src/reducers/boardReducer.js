const initialData = {
  player: {
    players: {},
    playerOrder: [],
  },
  team: {
    teams: {},
    teamOrder: [],
  },
  meta: {
    gameMode: "twos",
    recentSearches: ["thewarriorofblue", "sql_lall", "wundero"],
  },
};

const board = (state = initialData, action) => {
  switch (action.type) {
    case "SET_PLAYERS":
      return {
        ...state,
        player: {
          ...state.player,
          players: {
            ...action.newPlayers,
          },
        },
      };
    case "SET_PLAYER_ORDER":
      return {
        ...state,
        player: {
          ...state.player,
          playerOrder: action.newPlayerOrder,
        },
      };
    case "SET_TEAMS":
      return {
        ...state,
        team: {
          ...state.team,
          teams: { ...action.newTeams },
        },
      };
    case "SET_TEAM_ORDER":
      return {
        ...state,
        team: {
          ...state.team,
          teamOrder: action.newTeamOrder,
        },
      };

    case "SET_GAME_MODE":
      return {
        ...state,
        meta: {
          ...state.meta,
          gameMode: action.newGameMode,
        },
      };

    case "SET_RECENT_SEARCHES":
      return {
        ...state,
        meta: {
          ...state.meta,
          recentSearches: action.newRecentSearches,
        },
      };
    default:
      return state;
  }
};

export default board;

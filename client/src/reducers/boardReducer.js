import {
  prepBlankTeamsAndTeamOrder,
} from "../helpers/teamSortingLogic";
import { initialData } from "./boardReducerInitialData";

const board = (state = initialData, action) => {
  switch (action.type) {
    case "SET_PLAYERS":
      return {
        ...state,
        player: {
          ...state.player,
          players: {
            ...action.newPlayers
          }
        }
      };
    case "SET_PLAYER_ORDER":
      return {
        ...state,
        player: {
          ...state.player,
          playerOrder: action.newPlayerOrder
        }
      };
    case "SET_TEAMS":
      return {
        ...state,
        team: {
          ...state.team,
          teams: { ...action.newTeams }
        }
      };
    case "SET_TEAM_ORDER":
      return {
        ...state,
        team: {
          ...state.team,
          teamOrder: action.newTeamOrder
        }
      };

    case "SET_GAME_MODE":
      return {
        ...state,
        meta: {
          ...state.meta,
          gameMode: action.newGameMode
        }
      };

    case "SET_RECENT_SEARCHES":
      return {
        ...state,
        meta: {
          ...state.meta,
          recentSearches: action.newRecentSearches
        }
      };

    case "SORT_TEAMS":
      return {
        ...state,
        player: {
          ...state.player,
          playerOrder: action.newPlayerOrder
        },
        team: {
          ...state.team,
          teams: action.newTeams,
          teamOrder: action.newTeamOrder
        }
      };
    case "RESET":
      let [newTeams, newTeamOrder] = prepBlankTeamsAndTeamOrder(
        state.player.players,
        state.meta.gameMode
      );
      return {
        ...state,
        player: {
          ...state.player,
          playerOrder: Object.keys(state.player.players)
        },
        team: {
          ...state.team,
          teams: newTeams,
          teamOrder: newTeamOrder
        }
      };

    default:
      return state;
  }
};

export default board;

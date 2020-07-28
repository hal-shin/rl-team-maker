import { prepBlankTeamsAndTeamOrder } from "../helpers/teamSortingLogic";
import { initialData } from "./eventReducerInitialData";
import generateRoundRobin from "../helpers/roundRobin";

const event = (state = initialData, action) => {
  switch (action.type) {
    case "SET_EVENT":
      return { ...state, ...action.newEvent };

    case "SET_STORE":
      return { ...action.newStore.event };

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

    case "SET_PHASE":
      return {
        ...state,
        phase: action.newPhase
      };

    case "SET_ROUND_ROBIN":
      const [games, brackets, teamsWithGames] = generateRoundRobin(
        state.team.teams
      );
      return {
        ...state,
        team: {
          ...state.team,
          teams: teamsWithGames
        },
        phase: "round-robin",
        bracket: { roundRobin: brackets },
        games
      };

    case "SET_NOTES":
      return {
        ...state,
        games: {
          ...state.games,
          [action.gameId]: {
            ...state.games[action.gameId],
            notes: action.newNotes
          }
        }
      };

    case "SET_SCORE":
      return {
        ...state,
        games: {
          ...state.games,
          [action.gameId]: {
            ...state.games[action.gameId],
            score: {
              ...state.games[action.gameId].score,
              overall: {
                ...state.games[action.gameId].score.overall,
                [action.side]: action.newScore
              }
            }
          }
        }
      };

    default:
      return state;
  }
};

export default event;

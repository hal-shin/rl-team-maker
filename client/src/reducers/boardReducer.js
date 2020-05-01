const initialData = {
  player: {
    players: {
      nuclearbacon235: {
        id: "nuclearbacon235",
        platform: "steam",
        steamProfile: "https://steamcommunity.com/id/nuclearbacon235",
        trackerProfile:
          "https://rocketleague.tracker.network/profile/steam/nuclearbacon235",
        success: true,
        tag: "garb",
        icon:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/81/813feccda0130abfdd6d3df5bf72003aa1e81826_full.jpg",
        ranks: {
          currentSeason: { ones: 1034, twos: 1497, threes: 1468 },
          lastSeason: { ones: 1060, twos: 1535, threes: 1789 }
        },
        verified: true
      },
      exhil: {
        id: "exhil",
        platform: "steam",
        steamProfile: "https://steamcommunity.com/id/exhil",
        trackerProfile:
          "https://rocketleague.tracker.network/profile/steam/exhil",
        success: true,
        tag: "Exhil",
        icon:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/92/92bc9a3cf3a585e0634161d0f17d0c0e867d03e2_full.jpg",
        ranks: {
          currentSeason: { ones: 1072, twos: 1583, threes: 1439 },
          lastSeason: { ones: 1037, twos: 1654, threes: 1559 }
        },
        verified: true
      },
      wundero: {
        id: "wundero",
        platform: "steam",
        steamProfile: "https://steamcommunity.com/id/wundero",
        trackerProfile:
          "https://rocketleague.tracker.network/profile/steam/wundero",
        success: true,
        tag: "I:<",
        icon:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/27/27b6b7b672518bd344253fa648dfad9c2835b238_full.jpg",
        ranks: {
          currentSeason: { ones: 1001, twos: 1413, threes: 1450 },
          lastSeason: { ones: 1001, twos: 1457, threes: 1437 }
        },
        verified: true
      },
      sql_lall: {
        id: "sql_lall",
        platform: "steam",
        steamProfile: "https://steamcommunity.com/id/sql_lall",
        trackerProfile:
          "https://rocketleague.tracker.network/profile/steam/sql_lall",
        success: true,
        tag: "padster",
        icon:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4e/4e3ff5c26eff238d5aa8ef2b4a39070141e52229_full.jpg",
        ranks: {
          currentSeason: { ones: 1140, twos: 1583, threes: 1575 },
          lastSeason: { ones: 1116, twos: 1739, threes: 1673 }
        },
        verified: true
      },
      thewarriorofblue: {
        id: "thewarriorofblue",
        platform: "steam",
        steamProfile: "https://steamcommunity.com/id/thewarriorofblue",
        trackerProfile:
          "https://rocketleague.tracker.network/profile/steam/thewarriorofblue",
        success: true,
        tag: "TheWarriorOfBlue",
        icon:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e8/e849ef2a16c58c095a0434d6c48b2740e42e3579_full.jpg",
        ranks: {
          currentSeason: { ones: 1102, twos: 1566, threes: 1514 },
          lastSeason: { ones: 1117, twos: 1733, threes: 1804 }
        },
        verified: true
      },
      kill4candy: {
        id: "kill4candy",
        platform: "steam",
        steamProfile: "https://steamcommunity.com/id/kill4candy",
        trackerProfile:
          "https://rocketleague.tracker.network/profile/steam/kill4candy",
        success: true,
        tag: "Kill4Candy",
        icon:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/26/26b8e27fa7efe1874eadd8452e2b69e68c10b0ca_full.jpg",
        ranks: {
          currentSeason: { ones: 663, twos: 1211, threes: 1352 },
          lastSeason: { ones: 663, twos: 1243, threes: 1097 }
        },
        verified: true
      }
    },
    playerOrder: [
      "kill4candy",
      "nuclearbacon235",
      "exhil",
      "wundero",
      "sql_lall",
      "thewarriorofblue"
    ]
  },
  team: {
    teams: {},
    teamOrder: []
  },
  meta: {
    gameMode: "twos",
    recentSearches: [
      { query: "thewarriorofblue", platform: "steam" },
      { query: "sql_lall", platform: "steam" },
      { query: "wundero", platform: "steam" }
    ]
  }
};

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
    default:
      return state;
  }
};

export default board;

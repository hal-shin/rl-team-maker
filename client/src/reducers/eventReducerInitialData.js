export const sampleData = {
  _id: "sample",
  url: "/tournament/sample",
  title: "Sample Event",
  description:
    '{"blocks":[{"key":"8kbcv","text":"Welcome to the Sample Event!","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b3cc5","text":"This page intended to show you the ropes of creating a new event and fiddling around with the core functionality of the tournament app!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4i2ip","text":"Here are some of the features available to the Tournament Organizer (TO):","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":47,"length":25,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"f0eid","text":"Live Sessions - Automatic and immediate viewing of changes to the tournament.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"fmths","text":"Automatic MMR Fetch - Given a player\'s username, the app can scrape the player\'s ranks on the RL Tracker site (https://rocketleague.tracker.network/).","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"ccdj1","text":"Team Formation Playground - You can test out different team setups through the interactive drag-and-drop team board.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":25,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"bar2d","text":"Automatic Team Formation - The interactive team board also always the TO to either balance the team automatically or set Captain\'s Draft by placing the highest MMR players into their respective teams.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":25,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"cks85","text":"Bracket Generation - Once teams are set, you can generate the tournament brackets. Currently, we only support round robin.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"7339u","text":"This application is still in development, and so more features are coming soon! If you have any feature requests, please feel free to email me at hal.shin@alumni.ubc.ca.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  image:
    "https://steamcdn-a.akamaihd.net/steam/apps/252950/header_alt_assets_11.jpg?t=1585155609",
  startDate: new Date("July 1, 2020"),
  endDate: new Date("July 1, 2020"),
  status: "In Progress",
  private: false,
  phase: "forming",
  creator: {
    id: "5f0031d1652e5a0019ce3150",
    name: "thewarriorofblue"
  },
  registrants: {},
  admins: [{ id: "12345678", name: "You" }],
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
  },
  isAdmin: true
};

export const initialData = {
  id: "",
  url: "",
  title: "",
  description: "",
  image:
    "https://steamcdn-a.akamaihd.net/steam/apps/252950/header_alt_assets_11.jpg?t=1585155609",
  startDate: new Date(),
  endDate: new Date(),
  status: "",
  private: false,
  creator: {
    id: "",
    name: ""
  },
  registrants: {},
  admin: [],
  player: {
    players: {},
    playerOrder: []
  },
  team: {
    teams: {},
    teamOrder: []
  },
  meta: {
    gameMode: "twos",
    recentSearches: []
  },
  isAdmin: true
};

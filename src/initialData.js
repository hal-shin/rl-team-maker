const initialData = {
  teams: {
    "team-1": {
      id: "team-1",
      teamName: "Team 1",
      members: []
    },
    "team-2": {
      id: "team-2",
      teamName: "Team 2",
      members: []
    }
  },
  players: {
    thewarriorofblue: {
      id: "thewarriorofblue",
      tag: "TheWarriorOfBlue",
      icon:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e8/e849ef2a16c58c095a0434d6c48b2740e42e3579_full.jpg",
      ranks: {
        ones: 123,
        twos: 234,
        threes: 345
      }
    },
    sql_lall: {
      id: "sql_lall",
      tag: "padster",
      icon:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4e/4e3ff5c26eff238d5aa8ef2b4a39070141e52229_full.jpg",
      ranks: {
        ones: 1200,
        twos: 1700,
        threes: 1600
      }
    },
    wundero: {
      id: "wundero",
      tag: "wundero",
      icon: "",
      ranks: {
        ones: 1100,
        twos: 1500,
        threes: 1400
      }
    }
  },
  teamOrder: ["team-1", "team-2"],
  playerOrder: ["thewarriorofblue", "sql_lall", "wundero"]
};

export default initialData;

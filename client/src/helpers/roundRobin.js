import { v4 as uuid } from "uuid";

export function removeEmptyTeams(teams) {
  const teamsArray = getArrayOfTeams(teams);
  const newTeams = {};
  teamsArray.forEach(team => {
    if (team.members.length > 0) {
      newTeams[team.id] = { ...team };
    }
  });

  return newTeams;
}

function getArrayOfTeams(teams) {
  return Object.keys(teams).map(team => Object.assign({}, teams[team]));
}

function determineSeeding(teams) {
  return teams.sort((a, b) => b.totalMMR - a.totalMMR);
}

export default function generateRoundRobin(initialTeams) {
  const teamsCopy = Object.assign({}, initialTeams);
  const workingTeams = removeEmptyTeams(teamsCopy);
  const teamsArray = getArrayOfTeams(workingTeams);
  const teams = determineSeeding(teamsArray);
  if (teams.length % 2 === 1) {
    const bye = {
      id: "bye",
      teamName: "Bye",
      members: [],
      totalMMR: "bye",
      games: [],
      score: {
        wins: 0,
        losses: 0,
        differential: 0
      }
    };
    teams.push(bye);
    workingTeams["bye"] = { ...bye };
  }

  const teamCount = teams.length;
  const rounds = teamCount - 1;
  const half = teamCount / 2;

  const games = {};
  const tournamentPairings = [];

  const teamIndexes = teams.map((_, i) => i).slice(1);

  for (let round = 0; round < rounds; round++) {
    const roundPairings = [];

    const newTeamsIndexes = [0].concat(teamIndexes);

    const firstHalf = newTeamsIndexes.slice(0, half);
    const secondHalf = newTeamsIndexes.slice(half, teamCount).reverse();

    for (let i = 0; i < firstHalf.length; i++) {
      const id = uuid();

      workingTeams[teams[firstHalf[i]].id].games.push(id);
      workingTeams[teams[secondHalf[i]].id].games.push(id);

      games[id] = {
        blue: teams[firstHalf[i]],
        orange: teams[secondHalf[i]],
        score: {
          overall: {
            blue: null,
            orange: null
          },
          matches: []
        },
        notes: "",
        round: round + 1
      };

      roundPairings.push(id);
    }

    // rotating the array
    teamIndexes.unshift(teamIndexes.pop());
    tournamentPairings.push(roundPairings);
  }

  return [games, tournamentPairings, workingTeams];
}

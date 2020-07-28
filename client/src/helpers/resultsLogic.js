function didABeatB(teamAId, teamBId, teams, games) {
  let didTeamAWin = false;
  let scoreDifferential = 0;
  teams[teamAId].games.forEach(gameId => {
    const game = games[gameId];
    if (game.blue.id === teamBId || game.orange.id === teamBId) {
      if (game.blue.id === teamAId) {
        if (
          parseInt(game.score.overall.blue) >
          parseInt(game.score.overall.orange)
        ) {
          didTeamAWin = true;
        }
        scoreDifferential +=
          parseInt(game.score.overall.blue) -
          parseInt(game.score.overall.orange);
      } else {
        if (
          parseInt(game.score.overall.blue) <
          parseInt(game.score.overall.orange)
        ) {
          didTeamAWin = true;
        }
        scoreDifferential +=
          parseInt(game.score.overall.orange) -
          parseInt(game.score.overall.blue);
      }
    }
  });
  return [didTeamAWin, scoreDifferential];
}

function populateWinsAndDifferentials(teamsArray, teams, games) {
  let mostWins = 0;

  const newTeamsArray = teamsArray.map(teamId => {
    let wins = 0;
    let differential = 0;
    teamsArray.forEach(opponentId => {
      if (opponentId !== teamId) {
        const [didTeamWin, scoreDifferential] = didABeatB(
          teamId,
          opponentId,
          teams,
          games
        );
        if (didTeamWin) wins++;
        differential += scoreDifferential;
      }
    });

    if (wins > mostWins) mostWins = wins;

    return { id: teamId, wins, differential };
  });
  return newTeamsArray;
}

function sortTeamsByWins(initialTeams, games) {
  const teams = Object.assign(initialTeams);
  delete teams.bye;
  const teamsArray = Object.keys(teams);

  teamsArray.sort((a, b) => {
    const teamA = teams[a];
    const teamB = teams[b];
    return teamB.score.wins - teamA.score.wins;
  });

  const maxWins = teams[teamsArray[0]].score.wins;
  const outputArray = [];

  for (let i = maxWins; i >= 0; i--) {
    const teamsWithSameWins = teamsArray.filter(
      teamId => teams[teamId].score.wins === i
    );

    if (teamsWithSameWins.length < 2) {
      outputArray.push(...teamsWithSameWins);
    } else if (teamsWithSameWins.length === 2) {
      const firstTeamId = teamsWithSameWins[0];
      const secondTeamId = teamsWithSameWins[1];
      const [firstIsWinner] = didABeatB(
        firstTeamId,
        secondTeamId,
        teams,
        games
      );
      if (!firstIsWinner) {
        teamsWithSameWins.reverse();
      }

      outputArray.push(...teamsWithSameWins);
    } else if (teamsWithSameWins.length > 2) {
      const teamsWithScores = populateWinsAndDifferentials(
        teamsWithSameWins,
        teams,
        games
      );

      const teamsSortedWithScores = teamsWithScores.sort((a, b) => {
        if (a.wins === b.wins) {
          return b.differential - a.differential;
        } else {
          return b.wins - a.wins;
        }
      });

      const teamsArraySortedWithScores = teamsSortedWithScores.map(
        team => team.id
      );

      outputArray.push(...teamsArraySortedWithScores);
    }
  }

  return outputArray;
}

export function populateScores(initialTeams, games) {
  const teams = Object.assign(initialTeams);
  const teamsArray = Object.keys(teams);

  teamsArray.forEach(teamId => {
    const team = teams[teamId];
    let wins = 0;
    let losses = 0;
    team.games.forEach(gameId => {
      const game = games[gameId];
      const blueScore = parseInt(game.score.overall.blue);
      const orangeScore = parseInt(game.score.overall.orange);

      if (Number.isNaN(blueScore) || Number.isNaN(orangeScore)) {
        return;
      }
      if (game.blue.id === "bye" || game.orange.id === "bye") return;

      if (game.blue.id === teamId) {
        blueScore > orangeScore ? (wins += 1) : (losses += 1);
      } else {
        orangeScore > blueScore ? (wins += 1) : (losses += 1);
      }
    });
    team.score.wins = wins;
    team.score.losses = losses;
  });

  const sortedTeamsArray = sortTeamsByWins(teams, games);

  return [teams, sortedTeamsArray];
}

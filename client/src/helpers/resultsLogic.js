// function convertObjectToArray(obj) {
//   return Object.keys(obj).map(key => Object.assign({}, obj[key]));
// }

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

  return [teams]
}

export const generateBlankTeamsAndTeamOrder = numberOfTeams => {
  const newTeams = {};
  const newTeamOrder = [];
  for (let i = 1; i < numberOfTeams + 1; i++) {
    newTeams[`team-${i}`] = {
      id: `team-${i}`,
      teamName: `Team ${i}`,
      members: [],
      games: [],
      totalMMR: 0,
      score: {
        wins: 0,
        losses: 0
      }
    };
    newTeamOrder.push(`team-${i}`);
  }
  return [newTeams, newTeamOrder];
};

export const determineNumberOfTeams = (players, gameMode) => {
  let mode = gameMode === "twos" ? 2 : 3;
  return Math.ceil(Object.keys(players).length / mode);
};

export const prepBlankTeamsAndTeamOrder = (players, gameMode) => {
  const numberOfTeams = determineNumberOfTeams(players, gameMode);
  const [newTeams, newTeamOrder] = generateBlankTeamsAndTeamOrder(
    numberOfTeams
  );

  return [newTeams, newTeamOrder];
};

export const sortAllPlayersByMMR = (
  players,
  gameMode,
  season = "currentSeason"
) => {
  let workingPlayerOrder = Object.keys(players).sort((a, b) => {
    return (
      players[b].ranks[season][gameMode] - players[a].ranks[season][gameMode]
    );
  });
  return workingPlayerOrder;
};

export const checkTeamSortRequirements = (players, gameMode) => {
  const mode = gameMode === "twos" ? 2 : 3;
  if (Object.keys(players).length % mode !== 0) {
    return false;
  }
  return true;
};

export const generateBalancedTeams = (players, gameMode) => {
  if (!checkTeamSortRequirements(players, gameMode)) {
    throw new Error("mismatching player numbers");
  }

  const [newTeams, newTeamOrder] = prepBlankTeamsAndTeamOrder(
    players,
    gameMode
  );
  const numberOfTeams = determineNumberOfTeams(players, gameMode);
  const workingPlayerOrder = sortAllPlayersByMMR(players, gameMode);

  if (gameMode === "twos") {
    for (let i = 1; i < numberOfTeams + 1; i++) {
      newTeams[`team-${i}`].members.push(workingPlayerOrder.shift());
      newTeams[`team-${i}`].members.push(workingPlayerOrder.pop());
      newTeams[`team-${i}`].totalMMR = newTeams[`team-${i}`].members.reduce(
        (acc, curr) => acc + players[curr].ranks.currentSeason[gameMode],
        0
      );
    }
    return [newTeams, newTeamOrder, workingPlayerOrder];
  } else {
    for (let i = 0; i < numberOfTeams; i++) {
      newTeams[`team-${i + 1}`].members.push(workingPlayerOrder[i]);
      newTeams[`team-${i + 1}`].members.push(
        workingPlayerOrder[2 * numberOfTeams - 1 - i]
      );
      newTeams[`team-${i + 1}`].members.push(
        workingPlayerOrder[2 * numberOfTeams + i]
      );
      newTeams[`team-${i + 1}`].totalMMR = newTeams[`team-${i}`].members.reduce(
        (acc, curr) => acc + players[curr].ranks.currentSeason[gameMode],
        0
      );
    }
  }
  return [newTeams, newTeamOrder, []];
};

export const generateCaptainsDraftTeams = (players, gameMode) => {
  if (!checkTeamSortRequirements(players, gameMode)) {
    throw new Error("mismatching player numbers");
  }
  const [newTeams, newTeamOrder] = prepBlankTeamsAndTeamOrder(
    players,
    gameMode
  );
  const numberOfTeams = determineNumberOfTeams(players, gameMode);
  const workingPlayerOrder = sortAllPlayersByMMR(players, gameMode);

  for (let i = 1; i < numberOfTeams + 1; i++) {
    newTeams[`team-${i}`].members.push(workingPlayerOrder.shift());
    newTeams[`team-${i}`].totalMMR = newTeams[`team-${i}`].members.reduce(
      (acc, curr) => acc + players[curr].ranks.currentSeason[gameMode],
      0
    );
  }
  return [newTeams, newTeamOrder, workingPlayerOrder];
};

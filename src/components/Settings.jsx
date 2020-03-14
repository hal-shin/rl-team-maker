import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styled from "styled-components";

import { TeamContext } from "../contexts/TeamContext";
import { PlayerContext } from "../contexts/PlayerContext";
import { ThemeContext } from "../contexts/ThemeContext";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  }
}));

const Container = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Child = styled.div`
  margin-left: 10px;
`;

export default function Settings() {
  const classes = useStyles();
  const { gameMode, setGameMode } = useContext(ThemeContext);
  const [gameModeSelector, setGameModeSelector] = useState("2v2");
  const { teams, setTeams, teamOrder, setTeamOrder } = useContext(TeamContext);
  const { players, setPlayers, playerOrder, setPlayerOrder } = useContext(
    PlayerContext
  );

  useEffect(() => {
    reset();
  }, [gameMode]);

  const prepTeams = () => {
    const mode = gameMode === "twos" ? 2 : 3;
    if (Object.keys(players).length % mode !== 0)
      alert("Insufficient number of players for this mode.");
    const numberOfTeams = determineNumberOfTeams();
    const [newTeams, newTeamOrder] = generateBlankTeams(numberOfTeams);
    let workingPlayerOrder = Object.keys(players).sort((a, b) => {
      return players[b].ranks[gameMode] - players[a].ranks[gameMode];
    });
    return [numberOfTeams, workingPlayerOrder, newTeams, newTeamOrder];
  };

  const balanceTeams = () => {
    const [
      numberOfTeams,
      workingPlayerOrder,
      newTeams,
      newTeamOrder
    ] = prepTeams();
    if (gameMode === "twos") {
      for (let i = 1; i < numberOfTeams + 1; i++) {
        newTeams[`team-${i}`].members.push(workingPlayerOrder.shift());
        newTeams[`team-${i}`].members.push(workingPlayerOrder.pop());
      }
      setTeamOrder(newTeamOrder);
      setTeams(newTeams);
      setPlayerOrder(workingPlayerOrder);
      return;
    }

    for (let i = 0; i < numberOfTeams; i++) {
      newTeams[`team-${i + 1}`].members.push(workingPlayerOrder[i]);
      newTeams[`team-${i + 1}`].members.push(
        workingPlayerOrder[2 * numberOfTeams - 1 - i]
      );
      newTeams[`team-${i + 1}`].members.push(
        workingPlayerOrder[2 * numberOfTeams + i]
      );
    }
    setTeamOrder(newTeamOrder);
    setTeams(newTeams);
    setPlayerOrder([]);
  };

  const captainsDraft = () => {
    const [
      numberOfTeams,
      workingPlayerOrder,
      newTeams,
      newTeamOrder
    ] = prepTeams();

    for (let i = 1; i < numberOfTeams + 1; i++) {
      newTeams[`team-${i}`].members.push(workingPlayerOrder.shift());
    }
    setTeamOrder(newTeamOrder);
    setTeams(newTeams);
    setPlayerOrder(workingPlayerOrder);
  };

  const generateBlankTeams = numberOfTeams => {
    const newTeams = {};
    const newTeamOrder = [];
    for (let i = 1; i < numberOfTeams + 1; i++) {
      newTeams[`team-${i}`] = {
        id: `team-${i}`,
        teamName: `Team ${i}`,
        members: []
      };
      newTeamOrder.push(`team-${i}`);
    }
    return [newTeams, newTeamOrder];
  };

  const reset = () => {
    // move any current players on teams to player list
    if (Object.keys(players).length !== playerOrder.length) {
      const newPlayerOrder = [...playerOrder];
      for (let teamId in teams) {
        newPlayerOrder.splice(
          newPlayerOrder.length - 1,
          0,
          ...teams[teamId].members
        );
      }
      setPlayerOrder(newPlayerOrder);
    }

    // reset teams based on number of teams
    const numberOfTeams = determineNumberOfTeams();
    const [newTeams, newTeamOrder] = generateBlankTeams(numberOfTeams);
    setTeamOrder(newTeamOrder);
    setTeams(newTeams);
  };

  const handleGameModeChange = event => {
    setGameModeSelector(event.target.value);
    event.target.value === "2v2" ? setGameMode("twos") : setGameMode("threes");
  };

  const determineNumberOfTeams = () => {
    let mode = gameMode === "twos" ? 2 : 3;
    let calcNumberOfTeams = Math.ceil(Object.keys(players).length / mode);
    return calcNumberOfTeams;
    // setNumberOfTeams(calcNumberOfTeams);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Container>
      <Child>
        <FormControl className={classes.formControl}>
          <InputLabel id="game-mode-label">Game Mode</InputLabel>
          <Select
            labelId="game-mode-label"
            id="game-mode-select"
            value={gameModeSelector}
            onChange={handleGameModeChange}
          >
            <MenuItem value="2v2">2v2</MenuItem>
            <MenuItem value="3v3">3v3</MenuItem>
          </Select>
        </FormControl>
      </Child>
      <Child>
        <Button variant="contained" color="primary" onClick={balanceTeams}>
          Balance Teams
        </Button>
      </Child>
      <Child>
        <Button variant="contained" color="primary" onClick={captainsDraft}>
          Captain's Draft
        </Button>
      </Child>
      <Child>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Child>
    </Container>
  );
}

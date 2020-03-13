import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styled from "styled-components";

import { TeamContext } from "../contexts/TeamContext";
import { PlayerContext } from "../contexts/PlayerContext";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  }
}));

const Container = styled.div`
  display: flex;
  align-items: center; 
`;

export default function Settings() {
  const classes = useStyles();
  const [gameMode, setGameMode] = useState("2v2");
  const { teams, setTeams, numberOfTeams, setNumberOfTeams } = useContext(
    TeamContext
  );
  const { playerOrder, setPlayerOrder } = useContext(PlayerContext);

  const reset = () => {
    // move any current players on teams to player list
    const newPlayerOrder = [...playerOrder];
    for (let teamId in teams) {
      newPlayerOrder.splice(
        newPlayerOrder.length - 1,
        0,
        ...teams[teamId].members
      );
    }
    setPlayerOrder(newPlayerOrder);

    // reset teams based on number of teams
    const newTeams = {};
    for (let i = 1; i < numberOfTeams + 1; i++) {
      newTeams[`team-${i}`] = {
        id: `team-${i}`,
        teamName: `Team ${i}`,
        members: []
      };
    }
    setTeams(newTeams);
  };

  const handleGameModeChange = event => {
    setGameMode(event.target.value);
  };

  return (
    <Container>
      <FormControl className={classes.formControl}>
        <InputLabel id="game-mode-label">Game Mode</InputLabel>
        <Select
          labelId="game-mode-label"
          id="game-mode-select"
          value={gameMode}
          onChange={handleGameModeChange}
        >
          <MenuItem value="2v2">2v2</MenuItem>
          <MenuItem value="3v3">3v3</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="secondary" onClick={reset}>
        Reset
      </Button>
    </Container>
  );
}

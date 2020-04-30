import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { DialogContext } from "../contexts/DialogContext";
import {
  setPlayerOrder,
  setTeams,
  setTeamOrder,
  setGameMode
} from "../actions/boardActions";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "flex-end"
  },
  formControl: {
    minWidth: 120
  },
  child: {
    marginLeft: "10px"
  }
}));

export default function TeamMakerSettings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { players, playerOrder } = useSelector(state => state.board.player);
  const teams = useSelector(state => state.board.team.teams);
  const gameMode = useSelector(state => state.board.meta.gameMode);
  const [gameModeSelector, setGameModeSelector] = useState("2v2");
  const { setOpen } = useContext(DialogContext);

  useEffect(() => {
    reset();
  }, [gameMode]);

  const prepTeams = () => {
    const numberOfTeams = determineNumberOfTeams();
    const [newTeams, newTeamOrder] = generateBlankTeams(numberOfTeams);
    let workingPlayerOrder = Object.keys(players).sort((a, b) => {
      return (
        players[b].ranks.currentSeason[gameMode] -
        players[a].ranks.currentSeason[gameMode]
      );
    });
    return [numberOfTeams, workingPlayerOrder, newTeams, newTeamOrder];
  };

  const balanceTeams = () => {
    const mode = gameMode === "twos" ? 2 : 3;
    if (Object.keys(players).length % mode !== 0) {
      setOpen("team-error");
      return;
    }
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
      dispatch(setTeamOrder(newTeamOrder));
      dispatch(setTeams(newTeams));
      dispatch(setPlayerOrder(workingPlayerOrder));
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
    dispatch(setTeamOrder(newTeamOrder));
    dispatch(setTeams(newTeams));
    dispatch(setPlayerOrder([]));
  };

  const captainsDraft = () => {
    const mode = gameMode === "twos" ? 2 : 3;
    if (Object.keys(players).length % mode !== 0) {
      setOpen("team-error");
      return;
    }
    const [
      numberOfTeams,
      workingPlayerOrder,
      newTeams,
      newTeamOrder
    ] = prepTeams();

    for (let i = 1; i < numberOfTeams + 1; i++) {
      newTeams[`team-${i}`].members.push(workingPlayerOrder.shift());
    }
    dispatch(setTeamOrder(newTeamOrder));
    dispatch(setTeams(newTeams));
    dispatch(setPlayerOrder(workingPlayerOrder));
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

  const handleGameModeChange = event => {
    setGameModeSelector(event.target.value);
    event.target.value === "2v2" ? setGameMode("twos") : setGameMode("threes");
  };

  const determineNumberOfTeams = () => {
    let mode = gameMode === "twos" ? 2 : 3;
    return Math.ceil(Object.keys(players).length / mode);
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
      dispatch(setPlayerOrder(newPlayerOrder));
    }
    // reset teams based on number of teams
    const numberOfTeams = determineNumberOfTeams();
    const [newTeams, newTeamOrder] = generateBlankTeams(numberOfTeams);
    dispatch(setTeamOrder(newTeamOrder));
    dispatch(setTeams(newTeams));
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className={classes.container}>
      <div className={classes.child}>
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
      </div>
      <div className={classes.child}>
        <Button variant="contained" color="primary" onClick={balanceTeams}>
          Balance Teams
        </Button>
      </div>
      <div className={classes.child}>
        <Button variant="contained" color="primary" onClick={captainsDraft}>
          Captain's Draft
        </Button>
      </div>
      <div className={classes.child}>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}

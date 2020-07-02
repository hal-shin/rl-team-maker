import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { DialogContext } from "../../contexts/DialogContext";
import {
  generateBalancedTeams,
  generateCaptainsDraftTeams
} from "../../helpers/teamSortingLogic";
import { setGameMode, reset, sortTeams } from "../../actions/boardActions";

const useStyles = makeStyles({
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
});

export default function TeamMakerSettings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { players } = useSelector(state => state.board.player);
  const gameMode = useSelector(state => state.board.meta.gameMode);
  const [gameModeSelector, setGameModeSelector] = useState("2v2");
  const { setOpen } = useContext(DialogContext);

  useEffect(() => {
    dispatch(reset());
  }, [gameMode, dispatch]);

  const handleBalanceTeams = () => {
    try {
      const [
        newTeams,
        newTeamOrder,
        workingPlayerOrder
      ] = generateBalancedTeams(players, gameMode);
      dispatch(sortTeams(newTeams, newTeamOrder, workingPlayerOrder));
    } catch (err) {
      setOpen("sort-team-error");
    }
  };

  const handleCaptainsDraft = () => {
    try {
      const [
        newTeams,
        newTeamOrder,
        workingPlayerOrder
      ] = generateCaptainsDraftTeams(players, gameMode);
      dispatch(sortTeams(newTeams, newTeamOrder, workingPlayerOrder));
    } catch (err) {
      setOpen("sort-team-error");
    }
  };

  const handleGameModeChange = event => {
    setGameModeSelector(event.target.value);
    event.target.value === "2v2"
      ? dispatch(setGameMode("twos"))
      : dispatch(setGameMode("threes"));
  };

  const handleReset = () => {
    dispatch(reset());
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleBalanceTeams}
        >
          Balance Teams
        </Button>
      </div>
      <div className={classes.child}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCaptainsDraft}
        >
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
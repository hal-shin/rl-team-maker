import React from "react";
import { Paper } from "@material-ui/core";

import GameTeam from "./GameTeam";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: 25,
    width: 150
  },
});

function Game(props) {
  const classes = useStyles();
  return (
    <Paper elevation={0} variant="outlined" className={classes.root} square>
      <GameTeam color="primary" />
      <GameTeam color="secondary" />
    </Paper>
  );
}

export default Game;

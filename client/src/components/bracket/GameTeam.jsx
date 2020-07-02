import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",

    height: 25,
    width: 150
  },
  team: {
    display: "flex",
    alignItems: "center",
    flex: 1
  },
  score: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 25
  }
});

function GameTeam(props) {
  const classes = useStyles();

  const handleClick = event => {
    console.log(event);
    console.log("X:", event.screenX);
    console.log("Y:", event.screenY);
  };

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.team}>
        Team One
      </Typography>
      <Typography
        variant="body1"
        className={classes.score}
        onClick={handleClick}
      >
        0
      </Typography>
    </div>
  );
}

export default GameTeam;

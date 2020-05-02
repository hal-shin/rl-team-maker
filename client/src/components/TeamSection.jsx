import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

import TeamBoard from "./TeamBoard";
import TeamMakerSettings from "./TeamMakerSettings";
import AddNewTeam from "./AddNewTeam";

const useStyles = makeStyles(theme => ({
  container: {
    width: "80%",
    marginRight: 30,
    [theme.breakpoints.down("sm")]: {
      marginRight: 16
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: 0,
      width: 280
    }
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0 20px 0"
  },
  teamHeader: {
    display: "flex",
    alignContent: "center",
    "& h1": {
      margin: "0 20px 0 0"
    }
  },
  buttonDiv: {
    display: "flex",
    alignItems: "center"
  }
}));

export default function TeamSection() {
  const classes = useStyles();
  const teams = useSelector(state => state.board.team.teams);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.teamHeader}>
          <h1>Teams ({Object.keys(teams).length})</h1>
          <div className={classes.buttonDiv}>
            <AddNewTeam />
          </div>
        </div>
        <Hidden mdDown>
          <TeamMakerSettings />
        </Hidden>
      </div>
      <TeamBoard />
    </div>
  );
}

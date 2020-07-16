import React from "react";
import { useSelector } from "react-redux";
import { makeStyles,Hidden, Typography } from "@material-ui/core";

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
    alignContent: "center"
  },
  title: {
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    margin: "0 20px 0 0"
  },
  buttonDiv: {
    display: "flex",
    alignItems: "center"
  }
}));

export default function TeamSection() {
  const classes = useStyles();
  const teams = useSelector(state => state.event.team.teams);
  const { isAdmin } = useSelector(state => state.event);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.teamHeader}>
          <Typography className={classes.title} variant="h4">
            Teams ({Object.keys(teams).length})
          </Typography>
          <div className={classes.buttonDiv}>{isAdmin && <AddNewTeam />}</div>
        </div>
        <Hidden mdDown>{isAdmin && <TeamMakerSettings />}</Hidden>
      </div>
      <TeamBoard />
    </div>
  );
}

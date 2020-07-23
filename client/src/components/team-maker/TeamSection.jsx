import React from "react";
import { useSelector } from "react-redux";
import { Hidden, Typography } from "@material-ui/core";

import TeamBoard from "./TeamBoard";
import TeamMakerSettings from "./TeamMakerSettings";
import AddNewTeam from "./AddNewTeam";
import { useStyles } from "./TeamSectionStyles";

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

import React from "react";
import { useSelector } from "react-redux";
import { Hidden, Typography } from "@material-ui/core";

import TeamMakerSettings from "./TeamMakerSettings";
import AddNewTeam from "./AddNewTeam";
import { useStyles } from "./TeamSectionStyles";
import Team from "./Team";

export default function TeamSection() {
  const classes = useStyles();
  const { teams, teamOrder } = useSelector(state => state.event.team);
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
      <div className={classes.teamBoard}>
        {teamOrder.map(team => (
          <Team key={team} id={team} />
        ))}
      </div>
    </div>
  );
}

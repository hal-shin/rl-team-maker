/*

  Main team section for the RL Team Maker

*/

import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TeamBoard from "./TeamBoard";
import TeamMakerSettings from "./TeamMakerSettings";
import AddNewTeam from "./AddNewTeam";
import { TeamContext } from "../contexts/TeamContext";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    marginRight: "40px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0 20px 0",
  },
  teamHeader: {
    display: "flex",
    alignContent: "center",
    "& h1": {
      margin: "0 20px 0 0",
    },
  },
  buttonDiv: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function TeamSection() {
  const classes = useStyles();
  const { teams } = useContext(TeamContext);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.teamHeader}>
          <h1>Teams ({Object.keys(teams).length})</h1>
          <div className={classes.buttonDiv}>
            <AddNewTeam />
          </div>
        </div>
        <TeamMakerSettings />
      </div>
      <TeamBoard />
    </div>
  );
}

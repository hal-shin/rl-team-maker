import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

import TeamBoard from "./TeamBoard";
import TeamMakerSettings from "./TeamMakerSettings";
import AddNewTeam from "./AddNewTeam";
import { SocketContext } from "../../contexts/SocketContext";

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
  const { isViewer } = useContext(SocketContext);
  const teams = useSelector(state => state.board.team.teams);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.teamHeader}>
          <Typography className={classes.title} variant="h4">
            Teams ({Object.keys(teams).length})
          </Typography>
          <div className={classes.buttonDiv}>{!isViewer && <AddNewTeam />}</div>
        </div>
        <Hidden mdDown>{!isViewer && <TeamMakerSettings />}</Hidden>
      </div>
      <TeamBoard />
    </div>
  );
}

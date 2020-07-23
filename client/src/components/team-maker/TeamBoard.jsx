import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

import Team from "./Team";

const useStyles = makeStyles(theme => ({
  container: {
    height: "calc(100% - 110px)",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    overflowY: "scroll",
    msOverflowStyle: "none", // scrollbar hider - do not remove
    "&::-webkit-scrollbar": {
      display: "none" // scrollbar hider - do not remove
    }
  }
}));

export default function TeamBoard() {
  const classes = useStyles();
  const teamOrder = useSelector(state => state.event.team.teamOrder);

  return (
    <div className={classes.container}>
      {teamOrder.map(team => (
        <Team key={team} id={team} />
      ))}
    </div>
  );
}

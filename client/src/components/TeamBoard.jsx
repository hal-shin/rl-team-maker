import React  from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Team from "./Team";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "calc(100% - 110px)",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    overflowY: "scroll",
    //     ::-webkit-scrollbar {
    //   width: 0 !important;
    // }
    MsOverflowStyle: "none",
  },
}));

export default function TeamBoard() {
  const classes = useStyles();
  const teamOrder = useSelector((state) => state.board.team.teamOrder);

  return (
    <div className={classes.container}>
      {teamOrder.map((team) => (
        <Team key={team} id={team} />
      ))}
    </div>
  );
}

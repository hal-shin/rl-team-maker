import React from "react";
import { MapInteractionCSS } from "react-map-interaction";
import { makeStyles } from "@material-ui/core/styles";
import Game from "./Game";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "calc(100vh - 48px)"
  }
});

export default function TournamentBracket(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MapInteractionCSS>
        <Game />
      </MapInteractionCSS>
    </div>
  );
}

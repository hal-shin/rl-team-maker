import React, { useContext } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import { makeStyles, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Game from "./Game";
import { setRoundRobin } from "../../actions/eventActions";
import RoundRobin from "./RoundRobin";
import { DialogContext } from "../../contexts";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "calc(100vh - 48px)"
  },
  preBrackets: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "15vh"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around"
  }
});

export default function TournamentBracket() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { openSnackbar } = useContext(DialogContext);
  const {
    phase,
    team: { teamOrder }
  } = useSelector(state => state.event);

  const handleRoundRobin = () => {
    if (teamOrder.length <= 2) {
      openSnackbar("You must have at least 3 teams.");
      return;
    }
    dispatch(setRoundRobin());
  };

  const renderBrackets = () => {
    if (phase === "forming") {
      return (
        <div className={classes.preBrackets}>
          <div>
            <Typography variant="h4" gutterBottom>
              Select one of the following:
            </Typography>

            <div className={classes.buttons}>
              <Button
                onClick={handleRoundRobin}
                variant="contained"
                color="primary"
              >
                Round Robin
              </Button>
            </div>
          </div>
        </div>
      );
    } else if (phase === "round-robin") {
      return <RoundRobin />;
    } else if (phase === "brackets") {
      return (
        <MapInteractionCSS>
          <Game />
        </MapInteractionCSS>
      );
    }
  };

  return <div className={classes.root}>{renderBrackets()}</div>;
}

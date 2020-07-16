import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { DialogContext } from "../../contexts/DialogContext";
import { setPlayers, setPlayerOrder } from "../../actions/eventActions";
import { timeoutPromise } from "../../helpers/playerFetchLogic";

let bulkController;

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: 342
  },
  inputs: {
    width: "100%",
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      flex: 1
    }
  },
  centered: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function BulkAddPlayers() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { players, playerOrder } = useSelector(state => state.event.player);
  const { open, setOpen } = useContext(DialogContext);
  const [showing, setShowing] = useState("input");
  const [fetchedPlayers, setFetchedPlayers] = useState({});
  const [playerIds, setPlayerIds] = useState("");
  const [loadingCounter, setLoadingCounter] = useState(0);
  const [noDuplicatePlayerCheck, setNoDuplicatePlayerCheck] = useState(null);

  const handleChange = event => {
    setPlayerIds(event.target.value);
    checkDuplicatePlayerName(event.target.value);
  };

  const handleClose = () => {
    if (bulkController) {
      bulkController.abort();
    }
    setOpen(false);
    setFetchedPlayers({});
    setPlayerIds("");
    setLoadingCounter(0);
    setShowing("input");
    setNoDuplicatePlayerCheck(null);
  };

  const checkDuplicatePlayerName = input => {
    // sanitize playerIds string
    const currentPlayersArray = Object.keys(players);
    let allowSearch = true;
    if (input) {
      const playersArray = input.replace(/ /g, "").split(",");
      playersArray.forEach(id => {
        if (currentPlayersArray.includes(id)) {
          allowSearch = false;
          setNoDuplicatePlayerCheck(id);
        }
      });
    }
    if (allowSearch) {
      setNoDuplicatePlayerCheck(null);
    }
  };

  const fetchPlayers = () => {
    bulkController = new AbortController();
    setShowing("loading");

    // sanitize playerIds string
    let input = playerIds.replace(/ /g, "");
    const inputLength = input.split(",").length;

    timeoutPromise(
      1000 * (inputLength + 2) * 5,
      fetch(`/search/bulkAdd?ids=${input}`, {
        signal: bulkController.signal
      })
    )
      .then(response => response.json())
      .then(data => {
        if (!bulkController.signal.aborted) {
          setFetchedPlayers(data);
          setShowing("fetched-data");
        }
      })
      .catch(err => {
        console.error(err);
        if (!bulkController.signal.aborted) {
          console.log("displaying bulk error page");
          setShowing("error");
        }
      });
  };

  const handleConfirmAdd = () => {
    let newPlayers = { ...players };
    let newPlayerOrder = [...playerOrder];

    Object.keys(fetchedPlayers).forEach(id => {
      if (fetchedPlayers[id].success) {
        newPlayers[id] = fetchedPlayers[id];
        newPlayerOrder.unshift(id);
      }
    });

    dispatch(setPlayers(newPlayers));
    dispatch(setPlayerOrder(newPlayerOrder));
    handleClose();
  };

  const handleLoadingProgress = () => {
    let playersLength = playerIds.replace(/ /g, "").split(",").length;
    let timer = setInterval(() => {
      if (loadingCounter < playersLength) {
        setLoadingCounter(loadingCounter + 1);
      } else {
        clearInterval(timer);
      }
    }, 5000);
    return (
      <Typography variant="body2" style={{ marginBottom: 16 }}>
        Completed: {loadingCounter}/{playersLength}
      </Typography>
    );
  };

  const renderDialog = () => {
    if (showing === "input") {
      // initial form dialog
      return (
        <>
          <DialogContent>
            <DialogContentText id="team-bulk-add-dialog-description">
              Please input the IDs of the players you wish to add in bulk. Input
              must be <strong>comma-separated</strong>. Please allow five
              seconds of wait time per player (e. g. 30 seconds of loading for 6
              players).
            </DialogContentText>
            <div className={classes.inputs}>
              <TextField
                id="bulk-add-multiline"
                label="Player IDs"
                multiline
                rows={4}
                variant="outlined"
                onChange={handleChange}
                value={playerIds}
                error={Boolean(noDuplicatePlayerCheck)}
                helperText={
                  noDuplicatePlayerCheck &&
                  `${noDuplicatePlayerCheck} is already in the player list.`
                }
                required
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={fetchPlayers}
              color="primary"
              disabled={
                playerIds.length === 0 || Boolean(noDuplicatePlayerCheck)
              }
            >
              Take the shot!
            </Button>
          </DialogActions>
        </>
      );
    } else if (showing === "fetched-data") {
      // after players are fetched
      return (
        <>
          <DialogContent>
            <List dense>
              {Object.keys(fetchedPlayers).map(id => {
                return (
                  <ListItem key={id}>
                    <ListItemText>
                      {id} - {fetchedPlayers[id].success ? "Success" : "Fail"}
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirmAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </>
      );
    } else if (showing === "loading") {
      // loading gear
      return (
        <>
          <DialogContent className={classes.centered}>
            {handleLoadingProgress()}
            <CircularProgress />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button color="primary" disabled>
              Add
            </Button>
          </DialogActions>
        </>
      );
    } else if (showing === "error") {
      return (
        <DialogContent>
          <DialogContentText>
            An error occurred. Please try again.
          </DialogContentText>
        </DialogContent>
      );
    }
  };

  return (
    <Dialog
      open={open === "add-player-bulk"}
      keepMounted
      onClose={handleClose}
      aria-labelledby="team-bulk-add-dialog"
      aria-describedby="team-bulk-add-dialog-description"
      className={classes.container}
    >
      <DialogTitle id="team-bulk-add-dialog">{"Bulk Add Players"}</DialogTitle>
      {renderDialog()}
    </Dialog>
  );
}

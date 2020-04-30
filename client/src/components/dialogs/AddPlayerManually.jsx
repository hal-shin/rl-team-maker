import React, {useContext, useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import {DialogContext} from "../../contexts/DialogContext";
import {setPlayerOrder, setPlayers} from "../../actions/boardActions";

function AddPlayerManually() {
  const dispatch = useDispatch();
  const { players, playerOrder } = useSelector(state => state.board.player);
  const { open, setOpen } = useContext(DialogContext);
  const [uniqueId, setUniqueId] = useState(false);
  const [reasonableRank, setReasonableRank] = useState(false);
  const [manualPlayer, setManualPlayer] = useState({
    tag: "",
    twos: 0,
    threes: 0
  });

  const handleClose = () => {
    setOpen(false);
    setUniqueId(false);
  };

  const handleManualInput = event => {
    const newManualPlayer = { ...manualPlayer };
    newManualPlayer[event.target.id] = event.target.value;
    setManualPlayer(newManualPlayer);
    // unique id checker
    if (Object.keys(players).includes(event.target.value)) {
      setUniqueId(true);
    } else {
      setUniqueId(false);
    }
    // reasonable rank checker
    if (
      event.target.id === "ones" ||
      event.target.id === "twos" ||
      event.target.id === "threes"
    ) {
      if (event.target.value < 1 || event.target.value > 3000) {
        setReasonableRank(true);
      } else {
        setReasonableRank(false);
      }
    }
  };

  const handleAddNewManualPlayer = () => {
    const newPlayers = { ...players };
    const newPlayerOrder = [...playerOrder];
    newPlayers[manualPlayer.tag] = {
      id: manualPlayer.tag,
      tag: manualPlayer.tag,
      icon:
        "https://images.idgesg.net/images/article/2018/06/steam_logo2-100691182-orig-100761992-large.3x2.jpg",
      ranks: {
        currentSeason: {
          ones: manualPlayer.ones,
          twos: manualPlayer.twos,
          threes: manualPlayer.threes
        },
        lastSeason: {
          ones: manualPlayer.ones,
          twos: manualPlayer.twos,
          threes: manualPlayer.threes
        }
      },
      steamUrl: "",
      trackerUrl: ""
    };
    newPlayerOrder.unshift(manualPlayer.tag);
    dispatch(setPlayers(newPlayers));
    dispatch(setPlayerOrder(newPlayerOrder));
    setOpen(false);
  };

  return (
    <Dialog
      open={open === "add-player-manual"}
      onClose={handleClose}
      aria-labelledby="add-player-manually-dialog-title"
      maxWidth="sm"
    >
      <DialogTitle id="add-player-manually-dialog-title">
        Add Player Manually
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please add player details manually in the fields below. The in-game
          name must be unique and at least 3 characters in length. The player's
          ranks must be between 1 and 3000.
        </DialogContentText>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="tag"
              label="In-game name"
              error={uniqueId}
              onChange={handleManualInput}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={4}>
            <TextField
              error={reasonableRank}
              margin="dense"
              id="ones"
              label="1v1 Rank"
              type="number"
              inputProps={{ min: "1", max: "3000", step: "1" }}
              style={{ width: "100%" }}
              onChange={handleManualInput}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={reasonableRank}
              margin="dense"
              id="twos"
              label="2v2 Rank"
              type="number"
              inputProps={{ min: "1", max: "3000", step: "1" }}
              style={{ width: "100%" }}
              onChange={handleManualInput}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={reasonableRank}
              margin="dense"
              id="threes"
              label="3v3 Rank"
              type="number"
              inputProps={{ min: "1", max: "3000", step: "1" }}
              style={{ width: "100%" }}
              onChange={handleManualInput}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleAddNewManualPlayer}
          color="primary"
          disabled={
            manualPlayer.tag.length < 3 ||
            manualPlayer.twos === 0 ||
            manualPlayer.threes === 0 ||
            reasonableRank ||
            uniqueId
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddPlayerManually;

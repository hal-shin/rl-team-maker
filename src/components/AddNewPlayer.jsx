import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";
import { PlayerContext } from "../contexts/PlayerContext";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default function AddNewPlayer() {
  const { players, setPlayers, playerOrder, setPlayerOrder } = useContext(
    PlayerContext
  );
  const [open, setOpen] = useState(false);
  const [manualPlayer, setManualPlayer] = useState({});

  const handleClickOpen = () => {
    setOpen("steam");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenManual = () => {
    setOpen("manual");
  };

  const handleManualInput = event => {
    const newManualPlayer = { ...manualPlayer };
    newManualPlayer[event.target.id] = event.target.value;
    setManualPlayer(newManualPlayer);
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
        ones: manualPlayer.ones,
        twos: manualPlayer.twos,
        threes: manualPlayer.threes
      }
    };
    newPlayerOrder.unshift(manualPlayer.tag);
    setPlayers(newPlayers);
    setPlayerOrder(newPlayerOrder);
    setOpen(false);
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    const defaultPlayerOrder = Object.keys(players);
    localStorage.setItem("rl-players", JSON.stringify(players));
    localStorage.setItem("rl-playerOrder", JSON.stringify(defaultPlayerOrder));
  };

  useEffect(() => {
    updateLocalStorage();
  }, [players]);

  return (
    <Container>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New
      </Button>
      {/*ADD NEW PLAYER DIALOG*/}
      <Dialog
        open={open === "steam"}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new player</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new player, please enter the player's Steam ID.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="steam-id"
            label="Steam ID"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <div
            style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}
          >
            <Button onClick={handleOpenManual} color="primary">
              Add Manually
            </Button>
          </div>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>

      {/*MANUAL ADDITION DIALOG*/}
      <Dialog
        open={open === "manual"}
        onClose={handleClose}
        aria-labelledby="add-player-manually-dialog-title"
      >
        <DialogTitle id="add-player-manually-dialog-title">
          Add Player Manually
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add player details manually in the fields below.
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
                label="Username"
                onChange={handleManualInput}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={4}>
              <TextField
                margin="dense"
                id="ones"
                label="1v1 Rank"
                type="number"
                onChange={handleManualInput}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="dense"
                id="twos"
                label="2v2 Rank"
                type="number"
                onChange={handleManualInput}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="dense"
                id="threes"
                label="3v3 Rank"
                type="number"
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
          <Button onClick={handleAddNewManualPlayer} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

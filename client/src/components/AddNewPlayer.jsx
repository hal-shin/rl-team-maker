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
import PlayerStatic from "./PlayerStatic";

import { PlayerContext } from "../contexts/PlayerContext";
import { DialogContext } from "../contexts/DialogContext";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CenterContents = styled.div`
  display: flex;
  justify-content: center;
`;

export default function AddNewPlayer() {
  const { players, setPlayers, playerOrder, setPlayerOrder } = useContext(
    PlayerContext
  );
  const { open, setOpen } = useContext(DialogContext);
  const [steamId, setSteamId] = useState("");
  const [uniqueId, setUniqueId] = useState(false);
  const [reasonableRank, setReasonableRank] = useState(false);
  const [searchedPlayer, setSearchedPlayer] = useState({});
  const [manualPlayer, setManualPlayer] = useState({});

  const handleClickOpen = () => {
    setOpen("steam");
  };

  const handleClose = () => {
    setSearchedPlayer({});
    setOpen(false);
  };

  const handleSearchInput = event => {
    setSteamId(event.target.value);
    if (Object.keys(players).includes(event.target.value)) {
      setUniqueId(true);
    } else {
      setUniqueId(false);
    }
  };

  const handleKeyPress = event => {
    if (event.charCode === 13) {
      handleSearchPlayer();
    }
  };

  const handleSearchPlayer = () => {
    setOpen("automatic");
    fetch(`/search/${steamId}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newPlayer = data.newPlayer;
        setSearchedPlayer({ ...newPlayer });
      });
  };

  const handleKeyPressAutomatic = event => {
    if (event.charCode === 13) {
      handleAddNewAutomaticPlayer();
    }
  };

  const handleAddNewAutomaticPlayer = () => {
    const newPlayers = { ...players };
    const newPlayerOrder = [...playerOrder];
    newPlayers[searchedPlayer.id] = { ...searchedPlayer };
    newPlayerOrder.unshift(searchedPlayer.id);
    setPlayers(newPlayers);
    setPlayerOrder(newPlayerOrder);
    setOpen(false);
    setSearchedPlayer({});
    updateLocalStorage();
  };

  const handleOpenManual = () => {
    setOpen("manual");
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
    console.log(manualPlayer);
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
      },
      steamUrl: "",
      trackerUrl: ""
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

  const renderSearchedPlayer = () => {
    if (searchedPlayer && Object.keys(searchedPlayer).length > 0) {
      return <PlayerStatic player={searchedPlayer} />;
    }
    return <div>Searching...</div>;
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
            error={uniqueId}
            helperText="Steam ID must be unique and at least 2 characters long"
            margin="dense"
            id="steam-id"
            label="Steam ID"
            onChange={handleSearchInput}
            onKeyPress={handleKeyPress}
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
          <Button
            onClick={handleSearchPlayer}
            color="primary"
            disabled={steamId.length < 3 || uniqueId}
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>

      {/*AUTOMATIC ADDITION DIALOG*/}
      <Dialog
        open={open === "automatic"}
        onClose={handleClose}
        onKeyPress={handleKeyPressAutomatic}
        aria-labelledby="add-player-automatically-dialog-title"
      >
        <DialogTitle id="add-player-automatically-dialog-title">
          Add Player Automatically
        </DialogTitle>
        <DialogContent>
          <CenterContents>{renderSearchedPlayer()}</CenterContents>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNewAutomaticPlayer} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/*MANUAL ADDITION DIALOG*/}
      <Dialog
        open={open === "manual"}
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
            name must be unique and the player's ranks must be between 1 and
            3000.
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
            disabled={reasonableRank || uniqueId}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

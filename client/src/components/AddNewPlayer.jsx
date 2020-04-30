import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { CircularProgress } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { PlayerContext } from "../contexts/PlayerContext";
import { DialogContext } from "../contexts/DialogContext";
import PlayerStatic from "./PlayerStatic";
import { timeoutPromise } from "../helpers";
import {
  setPlayers,
  setPlayerOrder,
  setRecentSearches,
} from "../actions/boardActions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  centerContents: {
    display: "flex",
    justifyContent: "center",
  },
  chips: {
    margin: theme.spacing(0.5),
  },
}));

export default function AddNewPlayer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { players, playerOrder } = useSelector((state) => state.board.player);
  const recentSearches = useSelector(
    (state) => state.board.meta.recentSearches
  );

  const { open, setOpen } = useContext(DialogContext);
  const [steamId, setSteamId] = useState("");
  const [uniqueId, setUniqueId] = useState(false);
  const [platform, setPlatform] = useState("steam");
  const [reasonableRank, setReasonableRank] = useState(false);
  const [searchedPlayer, setSearchedPlayer] = useState({});
  const [manualPlayer, setManualPlayer] = useState({
    tag: "",
    twos: 0,
    threes: 0,
  });
  const [loading, setLoading] = useState("loading");

  const handleClickOpen = () => {
    setOpen("steam");
  };

  const handleClose = () => {
    setOpen(false);
    setSteamId("");
    setSearchedPlayer({});
    setUniqueId(false);
    setLoading("loading");
  };

  const handleSearchInput = (event) => {
    setSteamId(event.target.value);
    checkUniqueId(event.target.value);
  };

  const checkUniqueId = (checkId) => {
    if (Object.keys(players).includes(checkId)) {
      setUniqueId(true);
    } else {
      setUniqueId(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleSearchPlayer(platform, steamId);
    }
  };

  const handleClickChip = (name) => {
    setSteamId(name);
    handleSearchPlayer(platform, name);
    checkUniqueId(name);
  };

  const handleDeleteChip = (name) => {
    dispatch(
      setRecentSearches([...recentSearches].filter((search) => search !== name))
    );
  };

  const handleSearchPlayer = (searchPlatform, searchId) => {
    // update recent search history
    let newRecentSearches = [...recentSearches];
    if (!newRecentSearches.includes(searchId)) {
      newRecentSearches.unshift(steamId);
    } else {
      newRecentSearches = newRecentSearches.filter((name) => name !== searchId);
      newRecentSearches.unshift(searchId);
    }
    if (newRecentSearches.length > 5) {
      newRecentSearches = newRecentSearches.slice(0, 5);
    }
    dispatch(setRecentSearches(newRecentSearches));

    setOpen("automatic");
    timeoutPromise(
      10000,
      fetch(`/search/${searchId}${"?platform=" + platform}`)
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const newPlayer = data.newPlayer;
        setSearchedPlayer({ ...newPlayer });
      })
      .catch((err) => {
        console.error(err);
        setLoading("error");
      });
  };

  const handleKeyPressAutomatic = (event) => {
    if (event.charCode === 13 && uniqueId === false) {
      handleAddNewAutomaticPlayer();
    }
  };

  const handleAddNewAutomaticPlayer = () => {
    const newPlayers = { ...players };
    const newPlayerOrder = [...playerOrder];
    newPlayers[searchedPlayer.id] = { ...searchedPlayer };
    newPlayerOrder.unshift(searchedPlayer.id);
    dispatch(setPlayers(newPlayers));
    dispatch(setPlayerOrder(newPlayerOrder));
    setOpen(false);
    setSearchedPlayer({});
    updateLocalStorage();
  };

  const handleOpenManual = () => {
    setOpen("manual");
  };

  const handleManualInput = (event) => {
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
    console.log("Current Players:", players);
    console.log("Manual RAW", manualPlayer);
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
          threes: manualPlayer.threes,
        },
        lastSeason: {
          ones: manualPlayer.ones,
          twos: manualPlayer.twos,
          threes: manualPlayer.threes,
        },
      },
      steamUrl: "",
      trackerUrl: "",
    };
    newPlayerOrder.unshift(manualPlayer.tag);
    dispatch(setPlayers(newPlayers));
    dispatch(setPlayerOrder(newPlayerOrder));
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
    return (
      <div>
        {loading === "loading" ? (
          <CircularProgress />
        ) : (
          "Player could not be found. Please try again."
        )}
      </div>
    );
  };

  return (
    <div className={classes.container}>
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
          <div>
            {recentSearches.map((name) => {
              return (
                <Chip
                  key={name}
                  label={name}
                  size="small"
                  className={classes.chips}
                  onClick={() => handleClickChip(name)}
                  onDelete={() => handleDeleteChip(name)}
                />
              );
            })}
          </div>
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
          <div className={classes.centerContents}>{renderSearchedPlayer()}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {Object.keys(searchedPlayer).length > 0 && (
            <Button
              disabled={uniqueId}
              onClick={handleAddNewAutomaticPlayer}
              color="primary"
            >
              Add
            </Button>
          )}
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
            name must be unique and at least 3 characters in length. The
            player's ranks must be between 1 and 3000.
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
    </div>
  );
}

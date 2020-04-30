import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { CircularProgress } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { DialogContext } from "../contexts/DialogContext";
import PlayerStatic from "./PlayerStatic";
import { timeoutPromise } from "../helpers";
import {
  setPlayers,
  setPlayerOrder,
  setRecentSearches
} from "../actions/boardActions";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  centerContents: {
    display: "flex",
    justifyContent: "center"
  },
  chips: {
    margin: theme.spacing(0.5)
  }
}));

export default function AddNewPlayer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { players, playerOrder } = useSelector(state => state.board.player);
  const recentSearches = useSelector(state => state.board.meta.recentSearches);

  const { open, setOpen } = useContext(DialogContext);
  const [searchId, setSearchId] = useState("");
  const [uniqueId, setUniqueId] = useState(false);
  const [platform, setPlatform] = useState("steam");
  const [reasonableRank, setReasonableRank] = useState(false);
  const [searchedPlayer, setSearchedPlayer] = useState({});
  const [manualPlayer, setManualPlayer] = useState({
    tag: "",
    twos: 0,
    threes: 0
  });
  const [loading, setLoading] = useState("loading");

  const handleClickOpen = () => {
    setOpen("steam");
  };

  const handleClose = () => {
    setOpen(false);
    setSearchId("");
    setSearchedPlayer({});
    setUniqueId(false);
    setLoading("loading");
  };

  const handleSearchInput = event => {
    setSearchId(event.target.value);
    checkUniqueId(event.target.value);
  };

  const checkUniqueId = checkId => {
    if (Object.keys(players).includes(checkId)) {
      setUniqueId(true);
    } else {
      setUniqueId(false);
    }
  };

  const handleKeyPress = event => {
    if (event.charCode === 13) {
      fetchPlayer(platform, searchId);
    }
  };

  const handleClickChip = search => {
    setSearchId(search.query);
    fetchPlayer(search.platform, search.query);
    checkUniqueId(search.query);
  };

  const handleDeleteChip = name => {
    dispatch(
      setRecentSearches(
        [...recentSearches].filter(search => search.query !== name)
      )
    );
  };

  const handleSearchPlayer = () => {
    fetchPlayer(platform, searchId);
  };

  const fetchPlayer = (searchPlatform, searchId) => {
    // update recent search history
    let newRecentSearches = [...recentSearches];
    const latestSearch = { query: searchId, platform: searchPlatform };
    if (!newRecentSearches.find(search => search.query === searchId)) {
      newRecentSearches.unshift(latestSearch);
    } else {
      newRecentSearches = newRecentSearches.filter(
        search => search.query !== searchId
      );
      newRecentSearches.unshift(latestSearch);
    }
    if (newRecentSearches.length > 5) {
      newRecentSearches = newRecentSearches.slice(0, 5);
    }
    console.log("NEW SEARCH LOG:", newRecentSearches);
    dispatch(setRecentSearches(newRecentSearches));

    setOpen("automatic");
    timeoutPromise(
      10000,
      fetch(`/search/${searchId}${"?platform=" + searchPlatform}`)
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newPlayer = data.newPlayer;
        setSearchedPlayer({ ...newPlayer });
      })
      .catch(err => {
        console.error(err);
        setLoading("error");
      });
  };

  const handleKeyPressAutomatic = event => {
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
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    const defaultPlayerOrder = Object.keys(players);
    localStorage.setItem("rl-players", JSON.stringify(players));
    localStorage.setItem("rl-playerOrder", JSON.stringify(defaultPlayerOrder));
  };

  const handlePlatformChange = event => {
    setPlatform(event.target.value);
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
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                error={uniqueId}
                helperText="ID must be unique and at least 2 characters long"
                // margin="dense"
                id="player-id"
                label="Player ID"
                onChange={handleSearchInput}
                onKeyPress={handleKeyPress}
                // fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="platform-select-label">Platform</InputLabel>
              <Select
                labelId="platform-select-label"
                id="platform-simple-select"
                value={platform}
                onChange={handlePlatformChange}
              >
                <MenuItem value={"steam"}>Steam</MenuItem>
                <MenuItem value={"ps"}>PlayStation</MenuItem>
                <MenuItem value={"xbox"}>Xbox</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            {recentSearches.map((search, index) => {
              return (
                <Chip
                  key={`chip-${index}`}
                  label={search.query}
                  size="small"
                  className={classes.chips}
                  onClick={() => handleClickChip(search)}
                  onDelete={() => handleDeleteChip(search.query)}
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
            disabled={searchId.length < 3 || uniqueId}
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

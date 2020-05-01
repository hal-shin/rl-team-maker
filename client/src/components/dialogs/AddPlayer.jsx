import React, { useContext, useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { setRecentSearches } from "../../actions/boardActions";
import { timeoutPromise } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { DialogContext } from "../../contexts/DialogContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  chips: {
    margin: theme.spacing(0.5)
  }
}));

function AddPlayer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { players } = useSelector(state => state.board.player);
  const recentSearches = useSelector(state => state.board.meta.recentSearches);

  const { open, setOpen, setLoading, setFetchedPlayer } = useContext(
    DialogContext
  );
  const [searchId, setSearchId] = useState("");
  const [uniqueId, setUniqueId] = useState(false);
  const [platform, setPlatform] = useState("steam");

  const handleClose = () => {
    setOpen(false);
    setSearchId("");
    setUniqueId(false);
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
    dispatch(setRecentSearches(newRecentSearches));

    // add player automatically
    setOpen("add-player-auto");
    timeoutPromise(
      10000,
      fetch(`/search/add?id=${searchId}${"&platform=" + searchPlatform}`)
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newPlayer = data;
        if (newPlayer.success) setFetchedPlayer({ ...newPlayer });
        else setLoading("error");
      })
      .catch(err => {
        console.error(err);
        setLoading("error");
      });
  };

  const handlePlatformChange = event => {
    setPlatform(event.target.value);
  };

  return (
    <Dialog
      open={open === "add-player"}
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
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Button onClick={() => setOpen("add-player-manual")} color="primary">
            Manual
          </Button>
          <Button onClick={() => setOpen("add-player-bulk")} color="primary">
            Bulk Add
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
  );
}

export default AddPlayer;

import React, { useContext, useEffect, useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PlayerStatic from "../player/PlayerStatic";
import { CircularProgress } from "@material-ui/core";
import { setPlayerOrder, setPlayers } from "../../actions/boardActions";
import { useDispatch, useSelector } from "react-redux";
import { DialogContext } from "../../contexts/DialogContext";
import { abortController } from "./AddPlayer";

function AddPlayerAutomatically() {
  const dispatch = useDispatch();
  const { players, playerOrder } = useSelector(state => state.board.player);

  const {
    open,
    setOpen,
    loading,
    setLoading,
    fetchedPlayer,
    setFetchedPlayer
  } = useContext(DialogContext);
  const [uniqueId, setUniqueId] = useState(false);

  useEffect(() => {
    if (Object.keys(players).includes(fetchedPlayer.id)) {
      setUniqueId(true);
    }
  }, [fetchedPlayer, players]);

  const handleClose = () => {
    if (abortController) {
      abortController.abort();
    }
    setOpen(false);
    setUniqueId(false);
    setFetchedPlayer({});
    setLoading("loading");
  };

  const handleAddNewAutomaticPlayer = () => {
    const newPlayers = { ...players };
    const newPlayerOrder = [...playerOrder];
    newPlayers[fetchedPlayer.id] = { ...fetchedPlayer };
    newPlayerOrder.unshift(fetchedPlayer.id);
    dispatch(setPlayers(newPlayers));
    dispatch(setPlayerOrder(newPlayerOrder));
    setOpen(false);
    setFetchedPlayer({});
  };

  const handleKeyPressAutomatic = event => {
    if (event.charCode === 13 && uniqueId === false) {
      handleAddNewAutomaticPlayer();
    }
  };

  const renderSearchedPlayer = () => {
    if (fetchedPlayer && Object.keys(fetchedPlayer).length > 0) {
      return <PlayerStatic player={fetchedPlayer} />;
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
    <Dialog
      open={open === "add-player-auto"}
      onClose={handleClose}
      onKeyPress={handleKeyPressAutomatic}
      aria-labelledby="add-player-automatically-dialog-title"
    >
      <DialogTitle id="add-player-automatically-dialog-title">
        Add Player Automatically
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {renderSearchedPlayer()}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        {Object.keys(fetchedPlayer).length > 0 && (
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
  );
}

export default AddPlayerAutomatically;

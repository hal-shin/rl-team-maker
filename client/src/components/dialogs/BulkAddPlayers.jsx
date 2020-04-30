import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { DialogContext } from "../../contexts/DialogContext";

const useStyles = makeStyles(theme => ({
  inputs: {
    width: "100%",
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      flex: 1
    }
  }
}));

export default function BulkAddPlayers() {
  const classes = useStyles();
  const { open, setOpen } = useContext(DialogContext);
  const { playerIds, setPlayerIds } = useState("");

  const handleChange = event => {
    setPlayerIds(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBulkAdd = () => {
    alert("nice.");
  };

  return (
    <Dialog
      open={open === "add-player-bulk"}
      keepMounted
      onClose={handleClose}
      aria-labelledby="team-error-dialog"
      aria-describedby="team-error-dialog-description"
    >
      <DialogTitle id="team-error-dialog">{"Bulk Add Players"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="team-error-dialog-description">
          Please input the IDs of the players you wish to add in bulk. Input
          must be <strong>comma-separated</strong>. Please allow five seconds of
          wait time per player (e. g. 30 seconds of loading for 6 players).
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
            required
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleBulkAdd} color="primary">
          Take the shot!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

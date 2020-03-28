import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";


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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function PlayerDetails() {
  const classes = useStyles();
  const { open, setOpen } = useContext(DialogContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open === "player-info"}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="team-error-dialog"
      aria-describedby="team-error-dialog-description"
    >
      <DialogTitle id="team-error-dialog">{"Join a live session"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="team-error-dialog-description">
          Please input the name of the live session below. Your username will be
          visible to other members of this session.
        </DialogContentText>
        <div className={classes.inputs}>
          <TextField
            id="join-room-name"
            label="Room name"
            onChange={handleRoomNameChange}
            value={roomName}
            required
          />
          <TextField
            id="join-username"
            label="Username"
            onChange={handleUsernameChange}
            value={username}
            required
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleJoinRoom} color="primary">
          I got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

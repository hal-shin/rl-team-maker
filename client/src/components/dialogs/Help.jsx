import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { DialogContext } from "../../contexts/DialogContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Help() {
  const { open, setOpen } = useContext(DialogContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open === "help"}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Welcome to the Rocket League Team Maker!
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            This app allows Rocket League tournament organizers to easily grab
            the ranks from the RL Tracker site or manually set the ranks of
            players.
          </Typography>
          <Typography gutterBottom>
            <strong>To Add Players: </strong>
            Click the "NEW" button on the top right of the app. If you have the
            Steam ID of the player you are seeking, you can automatically pull
            their ranks from the RL Tracker site. Otherwise, press "ADD
            MANUALLY" to input a player's ranks manually.
          </Typography>
          <Typography gutterBottom>
            <strong>Sort Player List by Rank: </strong>
            Click on the "Players" header in the player list column.
          </Typography>
          <Typography gutterBottom>
            <strong>Balance Teams: </strong>
            Allocate the players to teams based on their ranks. The number of
            players must match exactly with the game mode. For example, you
            cannot sort 9 players into a 2v2 game mode team. In 2v2, the top
            player will be matched with the bottom player. In 3v3, the teams
            will be sorted akin to a captain's draft, where the lowest rank
            captain will have first pick, then the second lowest rank captain.
            Again, the top 3v3 player will be matched with the lowest ranked
            player.
          </Typography>
          <Typography gutterBottom>
            <strong>Captain's Draft: </strong>
            The number of players must match exactly with the game mode. The
            correct number of teams will be generated, and a captain for each
            team will be selected based on the highest ranks. The rest of the
            players will remain in the player pool for the captains to choose
            from.
          </Typography>
          <Typography gutterBottom>
            <strong>Reset: </strong>
            This button brings all the players back to the player list and
            regenerates blank teams in accordance of the number of players and
            the currently selected game mode.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Nice shot!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

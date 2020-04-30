import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { DialogContext } from "../../contexts/DialogContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function TeamError() {
  const { open, setOpen } = useContext(DialogContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open === "sort-team-error"}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="team-error-dialog"
      aria-describedby="team-error-dialog-description"
    >
      <DialogTitle id="team-error-dialog">
        {"You don't have enough players!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="team-error-dialog-description">
          The team allocation system requires that the number of players match
          exactly in the given number of teams. For example, for 3v3, the
          available number of players must be 6, 9, or 12. If you want to bypass
          this restriction, please set teams manually.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          What a save!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

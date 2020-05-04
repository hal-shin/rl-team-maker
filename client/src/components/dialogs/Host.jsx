import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { CircularProgress } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
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
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 100
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Host() {
  const classes = useStyles();
  const currentBoard = useSelector(state => state.board);
  const { open, setOpen } = useContext(DialogContext);
  const currentSession = useSelector(state => state.session);
  const [username, setUsername] = useState("");
  const [fetchedSession, setFetchedSession] = useState({});
  const [fetchSuccessful, setFetchSuccessful] = useState(false);
  const [showing, setShowing] = useState("default");

  useEffect(() => {
    if (currentSession.connected) {
      setFetchedSession({ session: { ...currentSession } });
      setShowing("success");
    }
  }, [currentSession.connected]);

  const handleClose = () => {
    if (fetchSuccessful) {
      handleSessionRedirect();
    }
    setOpen(false);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handleMakeRoom = () => {
    setShowing("loading");
    fetch("/session/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        boardData: currentBoard,
        newBoard: false,
        hostName: username
      })
    })
      .then(res => res.json())
      .then(data => {
        setFetchedSession(data);
        setFetchSuccessful(true);
        setShowing("success");
      })
      .catch(err => {
        console.error(err);
        setShowing("error");
      });

    setUsername("");
  };

  const handleSessionRedirect = () => {
    // history.push("/session/" + currentSession.hostUrl);
    setOpen(false);
  };

  const renderDialog = () => {
    if (showing === "default") {
      return (
        <div>
          <DialogTitle id="host-session-dialog">
            {"Start a live session"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="team-error-dialog-description">
              Please input the name of the live session below. You will need to
              give this name to other players who wish to view the live session.
            </DialogContentText>
            <div className={classes.inputs}>
              <TextField
                id="host-username"
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
            <Button onClick={handleMakeRoom} color="primary">
              I got it!
            </Button>
          </DialogActions>
        </div>
      );
    } else if (showing === "loading") {
      return (
        <div>
          <DialogTitle id="session-creation-error-dialog">
            {"Start a live session!"}
          </DialogTitle>
          <DialogContent>
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          </DialogContent>
        </div>
      );
    } else if (showing === "error") {
      return (
        <div>
          <DialogTitle id="session-creation-error-dialog">
            {"Something went wrong!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="session-creation-error-dialog-description">
              Please input the name of the live session below. You will need to
              give this name to other players who wish to view the live session.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              I got it!
            </Button>
          </DialogActions>
        </div>
      );
    } else if (showing === "success") {
      const appLink = "https://still-wildwood-39043.herokuapp.com/session/";
      return (
        <div>
          <DialogTitle id="host-session-dialog">
            {"Session started!"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Join Code"
              id="session-code"
              value={fetchedSession.session.viewerUrl}
              // style={{ margin: 8 }}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Public URL"
              id="session-viewer-url"
              value={appLink + fetchedSession.session.viewerUrl}
              // style={{ margin: 8 }}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Host URL"
              id="session-host-url"
              value={appLink + fetchedSession.session.hostUrl}
              // style={{ margin: 8 }}
              margin="normal"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Link to={`/session/${fetchedSession.session.hostUrl}`}>
              <Button onClick={handleSessionRedirect} color="primary">
                Great pass!
              </Button>
            </Link>
          </DialogActions>
        </div>
      );
    }
  };

  return (
    <Dialog
      open={open === "host"}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="host-session-dialog"
      aria-describedby="host-session-dialog-description"
    >
      {renderDialog()}
    </Dialog>
  );
}

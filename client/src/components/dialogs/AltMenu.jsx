import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { DialogContext } from "../../contexts/DialogContext";
import {
  generateBalancedTeams,
  generateCaptainsDraftTeams
} from "../../helpers/teamSortingLogic";
import { setGameMode, sortTeams, reset } from "../../actions/boardActions";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AltMenu() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const players = useSelector(state => state.board.player.players);
  const gameMode = useSelector(state => state.board.meta.gameMode);

  const { open, setOpen } = useContext(DialogContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleGameMode = () => {
    gameMode === "twos"
      ? dispatch(setGameMode("threes"))
      : dispatch(setGameMode("twos"));
    handleClose();
  };

  const handleBalanceTeams = () => {
    try {
      const [
        newTeams,
        newTeamOrder,
        workingPlayerOrder
      ] = generateBalancedTeams(players, gameMode);
      dispatch(sortTeams(newTeams, newTeamOrder, workingPlayerOrder));
      handleClose();
    } catch (err) {
      setOpen("sort-team-error");
    }
  };

  const handleCaptainsDraft = () => {
    try {
      const [
        newTeams,
        newTeamOrder,
        workingPlayerOrder
      ] = generateCaptainsDraftTeams(players, gameMode);
      dispatch(sortTeams(newTeams, newTeamOrder, workingPlayerOrder));
      handleClose();
    } catch (err) {
      setOpen("sort-team-error");
    }
  };

  const handleReset = () => {
    dispatch(reset());
    handleClose();
  };

  return (
    <Dialog
      fullScreen
      open={open === "alt-menu"}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Settings
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button onClick={handleToggleGameMode}>
          <ListItemText
            primary="Toggle Game Mode"
            secondary={`Current game mode: ${gameMode}`}
          />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleBalanceTeams}>
          <ListItemText
            primary="Balance Teams"
            secondary="Sorts available players into a set of teams with balanced average MMR"
          />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleCaptainsDraft}>
          <ListItemText
            primary="Captain's Draft"
            secondary="The highest MMR players are sorted into teams, with the remaining players to be selected manually"
          />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleReset}>
          <ListItemText
            primary="Reset"
            secondary="Remove all teams and relocate all players back into the player list"
          />
        </ListItem>
      </List>
    </Dialog>
  );
}

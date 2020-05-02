import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import { DialogContext } from "../../contexts/DialogContext";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    minHeight: 300,
    minWidth: 450,
    [theme.breakpoints.down("xs")]: {
      minWidth: 300
    }
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  content: {
    flex: "1 0 auto"
  },
  firstContent: {
    marginTop: theme.spacing(1)
  },
  profileImg: {
    margin: theme.spacing(1),
    height: 150,
    width: 150,
    borderRadius: 5
  },
  ranks: {
    width: 150,
    textTransform: "uppercase",
    fontSize: 13.5,
    fontWeight: 400,
    color: "#555",
    letterSpacing: 0.95,
    display: "flex",
    justifyContent: "space-between"
  },
  buttons: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
    marginBottom: theme.spacing(1)
  }
}));

export default function PlayerInfo(props) {
  const classes = useStyles();
  const { open, setOpen, currentPlayerInfo } = useContext(DialogContext);
  const player = { ...currentPlayerInfo };

  const handleClose = () => {
    setOpen(false);
  };

  // STEAM LINK BUTTON
  const handleOpenSteam = () => {
    if (player.steamProfile) {
      window.open(player.steamProfile);
    }
  };

  // TRACKER LINK BUTTON
  const handleOpenTracker = () => {
    if (player.trackerProfile) {
      window.open(player.trackerProfile);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="player-info-dialog-title"
      open={open === "player-info"}
    >
      {player && Object.keys(player).length > 0 && (
        <Card elevation={0} className={classes.root}>
          <div className={classes.leftColumn}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {player.tag}
              </Typography>
              <Typography variant="overline" color="textSecondary">
                {player.platform}
              </Typography>
              <Divider />
              <Typography
                variant="body1"
                color="primary"
                className={classes.firstContent}
                gutterBottom
              >
                Current Season Ranks:
              </Typography>
              <Typography variant="body2" className={classes.ranks}>
                Solo Duel: <span>{player.ranks.currentSeason.ones}</span>
              </Typography>
              <Typography variant="body2" className={classes.ranks}>
                Doubles: <span>{player.ranks.currentSeason.twos}</span>
              </Typography>
              <Typography variant="body2" className={classes.ranks}>
                Standard: <span>{player.ranks.currentSeason.threes}</span>
              </Typography>

              <Typography
                variant="body1"
                color="secondary"
                className={classes.firstContent}
                gutterBottom
              >
                Previous Season Ranks:
              </Typography>
              <Typography variant="body2" className={classes.ranks}>
                Solo Duel: <span>{player.ranks.lastSeason.ones}</span>
              </Typography>
              <Typography variant="body2" className={classes.ranks}>
                Doubles: <span>{player.ranks.lastSeason.twos}</span>
              </Typography>
              <Typography variant="body2" className={classes.ranks}>
                Standard: <span>{player.ranks.lastSeason.threes}</span>
              </Typography>
            </CardContent>
          </div>

          <div className={classes.rightColumn}>
            <CardMedia
              className={classes.profileImg}
              image={player.icon}
              title={player.tag + "'s Profile Image"}
            />
            <Typography variant="overline">
              Verified: <strong>{player.verified ? "yes" : "no"}</strong>
            </Typography>

            <div className={classes.buttons}>
              <Button
                size="small"
                color="primary"
                onClick={handleOpenSteam}
                disabled={!player.steamProfile}
              >
                Steam
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={handleOpenTracker}
                disabled={!player.trackerProfile}
              >
                Ranks
              </Button>
            </div>
          </div>
        </Card>
      )}
    </Dialog>
  );
}

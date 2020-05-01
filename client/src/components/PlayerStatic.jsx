import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    width: 225,
    height: 312,
    marginBottom: "15px"
  },
  rankTable: {
    display: "flex",
    justifyContent: "space-around"
  },
  rank: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& p": {
      margin: 0
    },
    "& h4": {
      margin: "5px"
    }
  }
});

export default function PlayerStatic(props) {
  const classes = useStyles();
  const { player } = props;

  const handleOpenSteam = () => {
    if (player.steamUrl) {
      window.open(player.steamUrl);
    }
  };

  const handleOpenTracker = () => {
    if (player.trackerProfile) {
      window.open(player.trackerProfile);
    }
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={player.icon}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {player.tag}
        </Typography>
        <div className={classes.rankTable}>
          <div className={classes.rank}>
            <h4>Ones</h4>
            <p>{player.ranks.currentSeason.ones}</p>
          </div>
          <div className={classes.rank}>
            <h4>Twos</h4>
            <p>{player.ranks.currentSeason.twos}</p>
          </div>
          <div className={classes.rank}>
            <h4>Threes</h4>
            <p>{player.ranks.currentSeason.threes}</p>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleOpenSteam}>
          Steam
        </Button>
        <Button size="small" color="primary" onClick={handleOpenTracker}>
          Ranks
        </Button>
      </CardActions>
    </Card>
  );
}

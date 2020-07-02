import React from "react";
import {
  makeStyles,
  Container,
  Paper,
  Typography,
  Grid
} from "@material-ui/core";

import { tournaments } from "../mocks";
import { TournamentCard } from "./index";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    height: "calc(100vh - 48px)"
  },
  jumbotron: {
    backgroundImage:
      'linear-gradient(0deg, rgba(50, 50, 150, 0.5), rgba(50, 50, 150, 0.5)), url("https://rocketleague.media.zestyio.com/rl_cross-play_asset_rl_1920.309bf22bd29c2e411e9dd8eb07575bb1.jpg")',
    backgroundRepeat: "none",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    [theme.breakpoints.up("sm")]: {
      minHeight: 300
    },
    [theme.breakpoints.up("md")]: {
      minHeight: 400
    },
    [theme.breakpoints.up("lg")]: {
      minHeight: 460
    }
  },
  jumboHeader: {
    background: "rgba(0,0,0,0.3)",
    padding: theme.spacing(0, 2),
    color: "white",
    fontWeight: 500
  },
  jumboSubheader: {
    padding: theme.spacing(0, 2),
    marginTop: theme.spacing(1),
    background: "rgba(0,0,0,0.3)",
    color: "white",
    fontWeight: 300
  },
  container: {},
  paper: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(3)
  },
  contentHeader: {
    marginBottom: theme.spacing(3)
  }
}));

export default function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.jumbotron}>
        <Typography variant="h2" className={classes.jumboHeader}>
          Rocket League Tournament App
        </Typography>
        <Typography variant="h6" className={classes.jumboSubheader}>
          Create teams, generate brackets, and host tournaments.
        </Typography>
      </div>
      <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper} variant="outlined">
          <Typography variant="h4" className={classes.contentHeader}>
            Featured Tournaments
          </Typography>

          <Grid container spacing={3}>
            {Object.keys(tournaments).map((id, index) => {
              const event = { ...tournaments[id] };
              return <TournamentCard key={index} event={event} />;
            })}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

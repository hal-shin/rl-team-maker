import React from "react";
import { makeStyles, Container, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    height: "calc(100vh - 48px)"
  },
  paper: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(3)
  },
  contentHeader: {
    marginBottom: theme.spacing(3)
  }
}));

export default function NewEvent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Paper variant="outlined" className={classes.paper}>
          <Typography variant="h4" className={classes.contentHeader}>
            New Event
          </Typography>
          <Typography variant="body1">
            The RL Tournament App is specifically designed to help organize
            Rocket League tournaments. Here are some of the key features to help
            organizers do their job better:
          </Typography>
          <ul>
            <li>
              <Typography>
                Automatic fetching of a player's MMR given their platform
                username.
              </Typography>
            </li>
            <li>
              <Typography>
                Easy balancing of teams through either an automated team sorting
                mechanism or a captain's draft.
              </Typography>
            </li>
            <li>
              <Typography>
                Simple visualization of the available teams and players
              </Typography>
            </li>
            <li>
              <Typography>
                Live hosting features -- changes to the tournament board is
                reflected automatically without refreshing the page for viewers
              </Typography>
            </li>
          </ul>
        </Paper>
      </Container>
    </div>
  );
}

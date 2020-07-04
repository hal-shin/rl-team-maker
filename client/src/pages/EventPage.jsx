import React, { useEffect, useState } from "react";
import { makeStyles, Container, Paper, Typography } from "@material-ui/core";

import { tournaments } from "../mocks";

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

export default function EventPage({ match }) {
  const classes = useStyles();
  const {
    params: { tournamentId }
  } = match;
  const [loading, setLoading] = useState(true);
  const [tournament, setTournament] = useState({});

  useEffect(() => {
    setTournament(tournaments[tournamentId]);
    setLoading(false);
  }, [tournamentId]);

  const renderContent = () => {
    if (loading) {
      return <Typography variant="body1">Loading...</Typography>;
    } else if (!tournament) {
      return (
        <Typography variant="body1">This tournament does not exist.</Typography>
      );
    } else {
      return (
        <>
          <Typography variant="h4" className={classes.contentHeader}>
            {tournament.title}
          </Typography>
        </>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Paper variant="outlined" className={classes.paper}>
          {renderContent()}
        </Paper>
      </Container>
    </div>
  );
}

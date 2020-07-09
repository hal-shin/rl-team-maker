import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Container,
  Paper,
  Typography,
  Button
} from "@material-ui/core";

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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  contentHeader: {
    marginBottom: theme.spacing(3)
  },
  coverImage: {
    border: "1px solid red"
  }
}));

export default function EventPage({ match }) {
  const classes = useStyles();
  const {
    params: { tournamentId }
  } = match;
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});

  useEffect(() => {
    fetch(`/tournament?tournamentId=${tournamentId}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        if (!data.message) setEvent(data);
        setLoading(false);
      });
  }, [tournamentId]);

  const renderContent = () => {
    if (loading) {
      return <Typography variant="body1">Loading...</Typography>;
    } else if (!event) {
      return (
        <Typography variant="body1">This event does not exist.</Typography>
      );
    } else {
      return (
        <>
          <div className={classes.header}>
            <Typography variant="h4" className={classes.contentHeader}>
              {event.title}
            </Typography>
            <Button variant="contained" color="primary">
              Register
            </Button>
          </div>
          <div className={classes.coverImage}>
            <img src={event.image} />
          </div>
          <div>
            <Typography variant="h5">Description</Typography>
            <Typography variant="body1">{event.description}</Typography>
          </div>
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

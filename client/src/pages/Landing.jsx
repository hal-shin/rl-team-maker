import React, { useContext, useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";

import { useStyles } from "./LandingStyles";
import { tournaments } from "../mocks";
import { TournamentCard, DefaultContainer } from "../components";
import { useAuthFetch } from "../hooks";
import { UserContext } from "../contexts";

export default function Landing() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [allTournaments, setAllTournaments] = useState(null);
  const {
    response: myTournaments,
    isLoading: myTournamentsLoading
  } = useAuthFetch(`/user/tournaments`);

  useEffect(() => {
    fetch("/tournament/all")
      .then(res => res.json())
      .then(data => setAllTournaments(data));
  }, []);

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
      <DefaultContainer>
        <Typography variant="h4" className={classes.contentHeader}>
          Featured Tournaments
        </Typography>

        <Grid container spacing={3} className={classes.grid}>
          {Object.keys(tournaments).map((id, index) => {
            const event = { ...tournaments[id] };
            return <TournamentCard key={index} event={event} />;
          })}
        </Grid>

        {user && user.events.hosting.length > 0 && (
          <>
            <Typography variant="h4" className={classes.contentHeader}>
              Hosting
            </Typography>

            <Grid container spacing={3} className={classes.grid}>
              {myTournamentsLoading
                ? "loading..."
                : myTournaments
                ? myTournaments.hosting.map((event, index) => (
                    <TournamentCard key={index} event={event} />
                  ))
                : ""}
            </Grid>
          </>
        )}

        {user && user.events.participating.length > 0 && (
          <>
            <Typography variant="h4" className={classes.contentHeader}>
              Participating
            </Typography>

            <Grid container spacing={3} className={classes.grid}>
              {myTournamentsLoading
                ? "loading..."
                : myTournaments
                ? myTournaments.participating.map((event, index) => (
                    <TournamentCard key={index} event={event} />
                  ))
                : ""}
            </Grid>
          </>
        )}

        {user && user.events.liked.length > 0 && (
          <>
            <Typography variant="h4" className={classes.contentHeader}>
              Liked Tournaments
            </Typography>

            <Grid container spacing={3} className={classes.grid}>
              {myTournamentsLoading
                ? "loading..."
                : myTournaments
                ? myTournaments.liked.map((event, index) => (
                    <TournamentCard key={index} event={event} />
                  ))
                : ""}
            </Grid>
          </>
        )}

        <Typography variant="h4" className={classes.contentHeader}>
          All Tournaments
        </Typography>

        <Grid container spacing={3} className={classes.grid}>
          {!allTournaments
            ? "loading..."
            : allTournaments.map((event, index) => (
                <TournamentCard key={index} event={event} />
              ))}
        </Grid>
      </DefaultContainer>
    </div>
  );
}

import React, { useContext } from "react";
import { Container, Paper, Typography, Grid } from "@material-ui/core";

import { useStyles } from "./LandingStyles";
import { tournaments } from "../mocks";
import { TournamentCard } from "../components";
import { useAuthFetch, useFetch } from "../hooks";
import { UserContext } from "../contexts";

export default function Landing() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const {
    response: allTournaments,
    isLoading: allTournamentsLoading
  } = useFetch("/tournament/all");
  const {
    response: myTournaments,
    isLoading: myTournamentsLoading
  } = useAuthFetch(`/user/tournaments`);

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
      <Container maxWidth="lg">
        <Paper className={classes.paper} variant="outlined">
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
                  : myTournaments.hosting.map((event, index) => (
                      <TournamentCard key={index} event={event} />
                    ))}
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
                  : myTournaments.participating.map((event, index) => (
                      <TournamentCard key={index} event={event} />
                    ))}
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
                  : myTournaments.liked.map((event, index) => (
                      <TournamentCard key={index} event={event} />
                    ))}
              </Grid>
            </>
          )}

          <Typography variant="h4" className={classes.contentHeader}>
            All Tournaments
          </Typography>

          <Grid container spacing={3} className={classes.grid}>
            {allTournamentsLoading
              ? "loading..."
              : allTournaments.map((event, index) => (
                  <TournamentCard key={index} event={event} />
                ))}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

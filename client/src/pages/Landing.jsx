import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Grid } from "@material-ui/core";

import { TournamentCard, DefaultContainer } from "../components";
import { useStyles } from "./LandingStyles";

export default function Landing() {
  const classes = useStyles();
  const {
    isAuthenticated,
    getAccessTokenSilently,
    user: authUser
  } = useAuth0();
  const { user } = useSelector(state => state);
  const [allTournaments, setAllTournaments] = useState(null);
  const [myTournaments, setMyTournaments] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getMyTourneys = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const resp = await fetch("/user/tournaments", {
          headers: {
            userid: authUser.sub.slice(6),
            Authorization: `Bearer ${accessToken}`
          },
          signal
        });
        const data = await resp.json();
        setMyTournaments(data);
      } catch (err) {}
    };

    if (isAuthenticated) getMyTourneys();

    return () => controller.abort();
  }, [isAuthenticated, authUser, getAccessTokenSilently]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("/tournament/all", { signal })
      .then(res => res.json())
      .then(data => setAllTournaments(data))
      .catch(err => console.log("All tournaments fetch error:", err));

    return () => controller.abort();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.jumbotron}>
        <Typography variant="h2" className={`${classes.jumboHeader}`}>
          Rocket League Tournament App
        </Typography>
        <Typography variant="h6" className={classes.jumboSubheader}>
          Create teams, generate brackets, and host tournaments.
        </Typography>
      </div>
      <DefaultContainer fullWidth>
        {user && user.events.hosting.length > 0 && (
          <>
            <Typography variant="h4" className={classes.contentHeader}>
              Hosting
            </Typography>

            <Grid container spacing={3} className={classes.grid}>
              {!myTournaments
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
              {!myTournaments
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
              {!myTournaments
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

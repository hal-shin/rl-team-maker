import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core";

import { socket } from "../socket";
import {
  Overview,
  Admin,
  TeamMaker,
  TournamentBracket,
  Results
} from "./event";
import { sampleData } from "../reducers/eventReducerInitialData";
import { setEvent } from "../actions/eventActions";

const useStyles = makeStyles(theme => ({
  save: {
    position: "absolute",
    top: "calc(100vh - 45px)",
    left: "100px",
    color: "grey"
  }
}));

let saveTimeout;

export default function EventPage({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const {
    params: { tournamentId }
  } = match;
  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    user
  } = useAuth0();
  const { event } = useSelector(state => state);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getTournamentData = () => {
      if (tournamentId === "sample") {
        dispatch(setEvent(sampleData));
      } else {
        fetch(
          `/tournament?tournamentId=${tournamentId}&userId=${user &&
            user.sub.slice(6)}`
        )
          .then(resp => resp.json())
          .then(data => {
            if (!data.message) dispatch(setEvent(data));
          });
      }
    };

    if (!isLoading && tournamentId !== event._id) {
      getTournamentData();
    }
  }, [tournamentId, dispatch, isLoading]);

  useEffect(() => {
    const updateTournament = () => {
      setIsSaving(true);
      clearTimeout(saveTimeout);

      saveTimeout = setTimeout(async () => {
        const accessToken = await getAccessTokenSilently();

        await fetch("/tournament/update", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            userid: user.sub.slice(6),
            "Content-type": "application/json"
          },
          body: JSON.stringify({ event })
        });

        setIsSaving(false);
      }, 2000);
    };

    if (
      isAuthenticated &&
      event.isAdmin &&
      tournamentId !== "sample" &&
      tournamentId === event._id
    ) {
      updateTournament();
    }

    return () => clearTimeout(saveTimeout);
  }, [event]);

  return (
    <>
      {tournamentId !== "sample" && event.isAdmin && (
        <div className={classes.save}>
          {isSaving ? "Autosaving..." : "Autosaved!"}
        </div>
      )}

      <Switch>
        <Route exact path={path}>
          <Redirect to={`/tournament/${tournamentId}/overview`} />
        </Route>
        <Route exact path={`${path}/overview`} component={Overview} />
        <Route exact path={`${path}/team`} component={TeamMaker} />
        <Route exact path={`${path}/bracket`} component={TournamentBracket} />
        <Route exact path={`${path}/admin`} component={Admin} />
        <Route exact path={`${path}/results`} component={Results} />
      </Switch>
    </>
  );
}

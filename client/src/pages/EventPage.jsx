import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core";

import { Overview, Admin } from "../components";
import TeamMaker from "../components/team-maker/TeamMaker";
import TournamentBracket from "../components/bracket/TournamentBracket";
import { sampleData } from "../reducers/eventReducerInitialData";
import { setEvent } from "../actions/eventActions";
import { setViewing } from "../actions/metaActions";
import { UserContext } from "../contexts";

const useStyles = makeStyles(theme => ({
  save: {
    position: "absolute",
    top: "calc(100vh - 45px)",
    left: "100px",
    color: "grey"
  }
}));

var saveTimeout;

export default function EventPage({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const {
    params: { tournamentId }
  } = match;
  const { isAuthenticated, isLoading, user } = useAuth0();
  const { event } = useSelector(state => state);
  const { authFetch } = useContext(UserContext);
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
      // dispatch(setViewing(true));
    };

    if (!isLoading && tournamentId !== event._id) {
      getTournamentData();
    }
  }, [tournamentId, dispatch, isLoading]);

  useEffect(() => {
    if (
      isAuthenticated &&
      event.isAdmin &&
      tournamentId !== "sample" &&
      tournamentId === event._id
    ) {
      setIsSaving(true);
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        authFetch("/tournament/update", {
          method: "POST",
          body: JSON.stringify({ event })
        }).then(() => {
          setIsSaving(false);
        });
      }, 2000);
    }
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
      </Switch>
    </>
  );
}

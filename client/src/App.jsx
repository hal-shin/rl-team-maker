import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";

import { useStyles } from "./AppStyles";
import { DialogContext, ThemeContext } from "./contexts";
import {
  Landing,
  Profile,
  EventPage,
  About,
  NewEvent,
  PageNotFound
} from "./pages";
import { TopAppBar, LeftDrawer, Snackbars, Dialogs } from "./components";
import { Chat, ChatSpeedDial } from "./components/chat";
import { setUser } from "./actions/userActions";
import { EventNotFound } from "./pages/event";

export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const { setOpenPlayerContextMenu } = useContext(DialogContext);
  const { menuOpen } = useContext(ThemeContext);

  useEffect(() => {
    const login = async () => {
      try {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch("/user", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user })
        });

        const data = await res.json();

        if (res.status >= 200 && res.status < 300) {
          dispatch(setUser(data));
        }
      } catch (err) {
        console.log("Could not login properly.", err);
      }
    };

    if (isAuthenticated) login();
  }, [isAuthenticated, getAccessTokenSilently, user, dispatch]);

  const handleMouseDown = event => {
    if (event.button === 2) {
      setOpenPlayerContextMenu({
        mouseX: null,
        mouseY: null
      });
    }
  };

  return (
    <div
      className={classes.root}
      onContextMenu={e => e.preventDefault()}
      onMouseDown={handleMouseDown}
    >
      <BrowserRouter>
        <TopAppBar />
        <LeftDrawer />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: menuOpen
          })}
        >
          <div className={classes.drawerHeader} />

          <Switch>
            <Route exact path="/profile/:userId" component={Profile} />
            <Route exact path="/tournament/new" component={NewEvent} />
            <Route
              exact
              path="/tournament/event-not-found"
              component={EventNotFound}
            />
            <Route path="/tournament/:tournamentId" component={EventPage} />
            <Route exact path="/about" component={About} />
            <Route exact path="/" render={() => <Landing />} />
            <Route component={PageNotFound} />
          </Switch>

          <Dialogs />
          <Snackbars />
          <Chat />
          <ChatSpeedDial />
        </main>
      </BrowserRouter>
    </div>
  );
}

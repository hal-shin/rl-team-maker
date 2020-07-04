import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";

import { useStyles } from "./AppStyles";
import { DialogContext, ThemeContext, UserContext } from "./contexts";
import { TopAppBar, LeftDrawer, Board, Snackbars, Dialogs } from "./components";
import {
  Landing,
  Profile,
  EventPage,
  About,
  NewEvent,
  PageNotFound
} from "./pages";

export default function App() {
  const classes = useStyles();
  const { setOpenPlayerContextMenu } = useContext(DialogContext);
  const { menuOpen } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const login = async () => {
      const accessToken = await getAccessTokenSilently();

      const resp = await fetch("/user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          UserID: user.sub
        },
        body: JSON.stringify({ user })
      });

      if (resp.status >= 200 && resp.status <= 299) {
        const data = await resp.json();
        setUser(data);
        console.log("logged in successfully");
      } else {
        console.log(resp.status, resp.statusText);
      }
    };

    if (user) {
      login();
    }
  }, [user]);

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
            <Route exact path="/session/:sessionUrl" render={() => <Board />} />
            <Route exact path="/profile/:userId" component={Profile} />
            <Route exact path="/tournament/new" component={NewEvent} />
            <Route
              exact
              path="/tournament/:tournamentId"
              component={EventPage}
            />
            <Route
              exact
              path="/tournament/sample/board"
              render={() => <Board />}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/" render={() => <Landing />} />
            <Route component={PageNotFound} />
          </Switch>

          <Dialogs />
          <Snackbars />
        </main>
      </BrowserRouter>
    </div>
  );
}

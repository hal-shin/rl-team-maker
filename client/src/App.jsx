import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import clsx from "clsx";

import { useStyles } from "./AppStyles";
import {
  DialogContext,
  ThemeContext,
  UserContext,
  ChatProvider
} from "./contexts";
import { TopAppBar, LeftDrawer, Board, Snackbars, Dialogs } from "./components";
import {
  Landing,
  Profile,
  EventPage,
  About,
  NewEvent,
  PageNotFound
} from "./pages";
import { Chat, ChatSpeedDial } from "./components/chat";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const classes = useStyles();
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const { setOpenPlayerContextMenu } = useContext(DialogContext);
  const { menuOpen } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);

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
          setUser(data);
        }
      } catch (err) {
        console.log("Could not login properly.");
      }
    };

    if (isAuthenticated) login();
  }, [isAuthenticated]);

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
            <Route path="/tournament/:tournamentId" component={EventPage} />
            <Route exact path="/about" component={About} />
            <Route exact path="/" render={() => <Landing />} />
            <Route component={PageNotFound} />
          </Switch>
          <Dialogs />
          <Snackbars />
          <ChatProvider>
            <Chat />
            <ChatSpeedDial />
          </ChatProvider>
        </main>
      </BrowserRouter>
    </div>
  );
}

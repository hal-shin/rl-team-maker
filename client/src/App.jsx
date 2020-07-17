import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import { useAuthFetch } from "./hooks";
import { Chat, ChatSpeedDial } from "./components/chat";

export default function App() {
  const classes = useStyles();
  const { response, error } = useAuthFetch("/user", { body: {} });
  const { setOpenPlayerContextMenu } = useContext(DialogContext);
  const { menuOpen } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (response && !error) {
      setUser(response);
    }
  }, [response, setUser, error]);

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
          <Chat />
          <ChatSpeedDial />
        </main>
      </BrowserRouter>
    </div>
  );
}

import React, { useContext } from "react";
import clsx from "clsx";

import TopAppBar from "./components/TopAppBar";
import LeftDrawer from "./components/LeftDrawer";

import { useStyles } from "./AppStyles";
import { DialogContext, ThemeContext } from "./contexts";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Board, Landing, Snackbars} from "./components";

export default function App() {
  const classes = useStyles();
  const { setOpenPlayerContextMenu } = useContext(DialogContext);
  const { menuOpen } = useContext(ThemeContext);

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
            <Route exact path="/board" render={() => <Board />} />
            <Route exact path="/" render={() => <Landing />} />
          </Switch>

          <Snackbars />
        </main>
      </BrowserRouter>
    </div>
  );
}

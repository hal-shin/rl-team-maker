import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Board from "./Board";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/session/:sessionUrl">
          <Board />
        </Route>
        <Route path="/">
          <Board />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
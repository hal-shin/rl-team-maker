import React, { Component } from "react";
import styled from "styled-components";

import NavBar from "./components/NavBar";
import Board from "./components/Board";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PlayerProvider } from "./contexts/PlayerContext";
import { TeamProvider } from "./contexts/TeamContext";

const Application = styled.div``;

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <TeamProvider>
          <PlayerProvider>
            <Application>
              <NavBar />
              <Board />
            </Application>
          </PlayerProvider>
        </TeamProvider>
      </ThemeProvider>
    );
  }
}

export default App;

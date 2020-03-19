import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import TeamMaker from "./components/TeamMaker";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PlayerProvider } from "./contexts/PlayerContext";
import { TeamProvider } from "./contexts/TeamContext";
import { DialogProvider } from "./contexts/DialogContext";
import { amber, red, yellow } from "@material-ui/core/colors";

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <TeamProvider>
          <PlayerProvider>
            <DialogProvider>
              <TeamMaker />
            </DialogProvider>
          </PlayerProvider>
        </TeamProvider>
      </ThemeProvider>
    );
  }
}

export default App;

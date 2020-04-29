import React, { Component } from "react";

import TeamMaker from "./components/TeamMaker";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PlayerProvider } from "./contexts/PlayerContext";
import { TeamProvider } from "./contexts/TeamContext";
import { DialogProvider } from "./contexts/DialogContext";
import { SocketProvider } from "./contexts/SocketContext";


class App extends Component {
  render() {
    return (

        <TeamMaker />


      // <ThemeProvider>
      //   <TeamProvider>
      //     <PlayerProvider>
      //       <DialogProvider>
      //         <SocketProvider>
      //           <TeamMaker />
      //         </SocketProvider>
      //       </DialogProvider>
      //     </PlayerProvider>
      //   </TeamProvider>
      // </ThemeProvider>
    );
  }
}

export default App;

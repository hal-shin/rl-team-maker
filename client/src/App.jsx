import React, { useContext, useState } from "react";
import clsx from "clsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Routes from "./components/Routes";
import TopAppBar from "./components/TopAppBar";
import LeftDrawer from "./components/LeftDrawer";

import { lightTheme, darkTheme, useStyles } from "./AppStyles";
import { DialogContext } from "./contexts/DialogContext";
import { ThemeContext } from "./contexts/ThemeContext";

export default function App() {
  const classes = useStyles();
  const { setOpenPlayerContextMenu } = useContext(DialogContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme; // must come after isDarkMode declaration

  const handleDrawerOpen = () => {
    setMenuOpen(true);
  };

  const handleDrawerClose = () => {
    setMenuOpen(false);
  };

  const handleMouseDown = event => {
    if (event.button === 2) {
      setOpenPlayerContextMenu({
        mouseX: null,
        mouseY: null
      });
    }
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_IDENTIFIER}
    >
      <MuiThemeProvider theme={theme}>
        <div
          className={classes.root}
          onContextMenu={e => e.preventDefault()}
          onMouseDown={handleMouseDown}
        >
          <CssBaseline />
          <TopAppBar handleDrawerOpen={handleDrawerOpen} menuOpen={menuOpen} />
          <LeftDrawer
            theme={theme}
            handleDrawerClose={handleDrawerClose}
            menuOpen={menuOpen}
          />

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: menuOpen
            })}
          >
            <div className={classes.drawerHeader} />
            <Routes />
          </main>
        </div>
      </MuiThemeProvider>
    </Auth0Provider>
  );
}

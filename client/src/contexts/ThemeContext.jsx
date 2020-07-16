import React, { createContext, useState } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import { darkTheme, lightTheme } from "../themes";
import { useLocalStorageState } from "../hooks";

export const ThemeContext = createContext();

export function ThemeProvider(props) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    "rl-tournament-app-darkmode",
    false
  );
  const [boardShowing, setBoardShowing] = useState("team-maker");
  const [viewMode, setViewMode] = useState("card");
  const [accountMenuEl, setAccountMenuEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDrawerOpen = () => {
    setMenuOpen(true);
  };

  const handleDrawerClose = () => {
    setMenuOpen(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        viewMode,
        setViewMode,
        boardShowing,
        setBoardShowing,
        menuOpen,
        setMenuOpen,
        accountMenuEl,
        setAccountMenuEl,
        handleDrawerOpen,
        handleDrawerClose
      }}
    >
      <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        {props.children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

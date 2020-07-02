import React, { createContext, useState } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import useToggle from "../hooks/useToggleState";
import {darkTheme, lightTheme} from "../themes";

export const ThemeContext = createContext();

export function ThemeProvider(props) {
  const [isDarkMode, toggleIsDarkMode] = useToggle(false);
  const [boardShowing, setBoardShowing] = useState("team-maker");
  const [viewMode, setViewMode] = useState("card");
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
        toggleIsDarkMode,
        viewMode,
        setViewMode,
        boardShowing,
        setBoardShowing,
        menuOpen,
        setMenuOpen,
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

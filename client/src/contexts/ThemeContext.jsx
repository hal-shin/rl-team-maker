import React, { createContext, useState } from "react";
import useToggle from "../hooks/useToggleState";

export const ThemeContext = createContext();

export function ThemeProvider(props) {
  const [isDarkMode, toggleIsDarkMode] = useToggle(false);
  const [boardShowing, setBoardShowing] = useState("team-maker");
  const [viewMode, setViewMode] = useState("card");

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleIsDarkMode,
        viewMode,
        setViewMode,
        boardShowing,
        setBoardShowing
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

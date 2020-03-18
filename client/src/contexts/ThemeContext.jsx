import React, { createContext, useState } from "react";
import useToggle from "../hooks/useToggleState";

export const ThemeContext = createContext();

export function ThemeProvider(props) {
  const [isDarkMode, toggleIsDarkMode] = useToggle(false);
  const [gameMode, setGameMode] = useState("twos");
  const [viewMode, setViewMode] = useState("card");

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleIsDarkMode,
        gameMode,
        setGameMode,
        viewMode,
        setViewMode
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

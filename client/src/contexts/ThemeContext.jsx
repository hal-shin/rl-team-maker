import React, { createContext, useState } from "react";
import useToggle from "../hooks/useToggleState";

export const ThemeContext = createContext();

export function ThemeProvider(props) {
  const [isDarkMode, toggleIsDarkMode] = useToggle(false);
  const [gameMode, setGameMode] = useState("twos");

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleIsDarkMode,
        gameMode,
        setGameMode
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

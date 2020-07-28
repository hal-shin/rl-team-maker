import React, { createContext, useState } from "react";

export const DialogContext = createContext();

export function DialogProvider(props) {
  const [open, setOpen] = useState(false);
  const [multiSnackbar, setMultiSnackbar] = useState({
    message: "",
    severity: "success"
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [loading, setLoading] = useState("loading"); // only options are "loading" and "error"
  const [chatOpen, setChatOpen] = useState(null);
  const [openPlayerContextMenu, setOpenPlayerContextMenu] = useState({
    mouseX: null,
    mouseY: null
  });
  const [fetchedPlayer, setFetchedPlayer] = useState({});
  const [currentPlayerInfo, setCurrentPlayerInfo] = useState({});

  const openMultiSnackbar = (message, severity) => {
    // severity options: 'error', 'warning', 'info', 'success'
    setMultiSnackbar({ message, severity });
  };

  const openSnackbar = message => {
    setSnackbarMessage(message);
  };

  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        snackbarOpen,
        setSnackbarOpen,
        loading,
        setLoading,
        chatOpen,
        setChatOpen,
        fetchedPlayer,
        setFetchedPlayer,
        openPlayerContextMenu,
        setOpenPlayerContextMenu,
        currentPlayerInfo,
        setCurrentPlayerInfo,
        snackbarMessage,
        setSnackbarMessage,
        openSnackbar,
        multiSnackbar,
        openMultiSnackbar
      }}
    >
      {props.children}
    </DialogContext.Provider>
  );
}

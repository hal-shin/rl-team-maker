import React, { createContext, useState } from "react";

export const DialogContext = createContext();

export function DialogProvider(props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState("loading"); // only options are "loading" and "error"
  const [chatOpen, setChatOpen] = useState(null);
  const [openPlayerContextMenu, setOpenPlayerContextMenu] = useState({
    mouseX: null,
    mouseY: null
  });
  const [fetchedPlayer, setFetchedPlayer] = useState({});
  const [currentPlayerInfo, setCurrentPlayerInfo] = useState({});

  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        loading,
        setLoading,
        chatOpen,
        setChatOpen,
        fetchedPlayer,
        setFetchedPlayer,
        openPlayerContextMenu,
        setOpenPlayerContextMenu,
        currentPlayerInfo,
        setCurrentPlayerInfo
      }}
    >
      {props.children}
    </DialogContext.Provider>
  );
}

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
  const [currentPlayerContext, setCurrentPlayerContext] = useState(null); // check usage of this

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
        currentPlayerContext,
        setCurrentPlayerContext
      }}
    >
      {props.children}
    </DialogContext.Provider>
  );
}

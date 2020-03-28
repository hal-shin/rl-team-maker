import React, { createContext, useState } from "react";

export const DialogContext = createContext();

export function DialogProvider(props) {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(null);
  const [openPlayerContextMenu, setOpenPlayerContextMenu] = useState({
    mouseX: null,
    mouseY: null
  });
  const [currentPlayerContext, setCurrentPlayerContext] = useState(null);

  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        chatOpen,
        setChatOpen,
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

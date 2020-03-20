import React, { createContext, useState } from "react";

export const DialogContext = createContext();

export function DialogProvider(props) {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(null);

  return (
    <DialogContext.Provider value={{ open, setOpen, chatOpen, setChatOpen }}>
      {props.children}
    </DialogContext.Provider>
  );
}

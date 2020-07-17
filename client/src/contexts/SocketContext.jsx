import React, { createContext, useState } from "react";

export const SocketContext = createContext();

export function SocketProvider(props) {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [session, setSession] = useState({
    connected: false,
    isHost: false,
    isViewer: false
  });

  return (
    <SocketContext.Provider
      value={{
        users,
        setUsers,
        messages,
        setMessages,
        session,
        setSession,
        room,
        setRoom
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

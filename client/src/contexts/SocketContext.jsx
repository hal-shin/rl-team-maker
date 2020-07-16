import React, { createContext, useState } from "react";

export const SocketContext = createContext();

export function SocketProvider(props) {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [usernameLive, setUsernameLive] = useState("");
  const [roomNameLive, setRoomNameLive] = useState("");
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
        usernameLive,
        setUsernameLive,
        roomNameLive,
        setRoomNameLive,

        session,
        setSession
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

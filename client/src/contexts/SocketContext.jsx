import React, { createContext, useState } from "react";

export const SocketContext = createContext();

export function SocketProvider(props) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [usernameLive, setUsernameLive] = useState("");
  const [roomNameLive, setRoomNameLive] = useState("");
  const [currentSessionUrl, setCurrentSessionUrl] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState("");
  const [connected, setConnected] = useState(false);
  const [isViewer, setIsViewer] = useState(false);
  const [isHost, setIsHost] = useState(false);

  return (
    <SocketContext.Provider
      value={{
        users,
        setUsers,
        message,
        setMessage,
        messages,
        setMessages,
        usernameLive,
        setUsernameLive,
        roomNameLive,
        setRoomNameLive,
        currentSessionUrl,
        setCurrentSessionUrl,
        currentSessionId,
        setCurrentSessionId,
        isViewer,
        setIsViewer,
        connected,
        setConnected,
        isHost,
        setIsHost
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

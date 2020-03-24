import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export var chat;

export const SocketContext = createContext();

export function SocketProvider(props) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [usernameLive, setUsernameLive] = useState("");
  const [roomNameLive, setRoomNameLive] = useState("");

  useEffect(() => {
    chat = io.connect("/chat");
  }, []);

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
        setRoomNameLive
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

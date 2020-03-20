import React, { createContext, useState } from "react";

export const SocketContext = createContext();

export function SocketProvider(props) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);



  return (
    <SocketContext.Provider
      value={{
        users,
        setUsers,
        message,
        setMessage,
        messages,
        setMessages
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

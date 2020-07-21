import React, { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

export function ChatProvider(props) {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    console.log("Rooms changed:", rooms);
  }, [rooms]);

  return (
    <ChatContext.Provider
      value={{
        users,
        setUsers,
        messages,
        setMessages,
        room,
        setRoom,
        rooms,
        setRooms
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
}

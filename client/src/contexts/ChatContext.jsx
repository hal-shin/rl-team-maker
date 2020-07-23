import React, { createContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { addMessage } from "../actions/chatActions";
import { useDispatch } from "react-redux";

export const ChatContext = createContext();

export function ChatProvider(props) {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    const addToMessages = (chatRoom, message) => {
      dispatch(addMessage({ message, room: chatRoom }));
    };

    socket.on("message", payload => {
      addToMessages(payload.room, payload.message);
    });
  }, [dispatch]);

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

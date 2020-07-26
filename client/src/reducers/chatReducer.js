import { initialData } from "./chatReducerInitialData";

const chat = (state = initialData, action) => {
  switch (action.type) {
    case "SET_CONNECTED":
      return { ...state, connected: action.connected };
    case "JOIN_ROOM":
      if (!state.rooms[action.room]) {
        return {
          ...state,
          rooms: {
            ...state.rooms,
            [action.room]: {
              messages: [],
              connected: true
            }
          }
        };
      } else {
        return { ...state };
      }

    case "SET_ROOM":
      return { ...state, room: action.room };

    case "ADD_MESSAGE":
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...state.rooms[action.room],
            messages: [...state.rooms[action.room].messages, action.message]
          }
        }
      };
    default:
      return state;
  }
};

export default chat;

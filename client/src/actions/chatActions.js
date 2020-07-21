export const setRoom = newRoom => ({
  type: "SET_ROOM",
  room: newRoom
});

export const joinRoom = room => ({
  type: "JOIN_ROOM",
  room
});

export const addMessage = payload => ({
  type: "ADD_MESSAGE",
  message: payload.message,
  room: payload.room
});

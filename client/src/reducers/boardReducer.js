const board = (state = [], action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return [...state, action.data];
    default:
      return state;
  }
};

export default board;
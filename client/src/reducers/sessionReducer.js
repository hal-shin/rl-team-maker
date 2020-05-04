const session = (state = { connected: false }, action) => {
  switch (action.type) {
    case "SET_SESSION":
      return {
        ...state,
        ...action.sessionData
      };
    default:
      return state;
  }
};

export default session;

const user = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...action.newUser
      };
    default:
      return state;
  }
};

export default user;

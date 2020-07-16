const initialData = {
  tournamentId: "",
  isViewing: false
};

const meta = (state = initialData, action) => {
  switch (action.type) {
    case "SET_VIEWING":
      return {
        ...state,
        isViewing: action.newViewing
      };
    default:
      return state;
  }
};

export default meta;

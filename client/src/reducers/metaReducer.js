const initialData = {
  tournamentId: "",
  isViewing: false,
  connectedToEventSocket: false
};

const meta = (state = initialData, action) => {
  switch (action.type) {
    case "SET_VIEWING":
      return {
        ...state,
        isViewing: action.newViewing
      };

    case "SET_CONNECTED_TO_EVENT_SOCKET":
      return {
        ...state,
        connectedToEventSocket: action.connectedToEventSocket
      };
    default:
      return state;
  }
};

export default meta;

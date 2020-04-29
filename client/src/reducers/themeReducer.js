const initData = {
  isDarkMode: false,
};

const theme = (state = initData, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return { ...state, isDarkMode: !state.isDarkMode };
    default:
      return state;
  }
};

export default theme;

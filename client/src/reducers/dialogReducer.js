const initState = {
  currentDialog: "closed",
  chatOpen: false,
  isContextMenuOpen: false,
  contextMenuPosition: null,
  contextMenuId: null,
};

const dialog = (state = initState, action) => {
  switch (action.type) {
    // DIALOGS
    case "CLOSE_DIALOG":
      return { ...state, currentDialog: "closed" };
    case "OPEN_DIALOG_HELP":
      return { ...state, currentDialog: "help" };
    case "OPEN_DIALOG_SORT_TEAM_ERROR":
      return { ...state, currentDialog: "sort-team-error" };
    case "OPEN_DIALOG_HOST":
      return { ...state, currentDialog: "host" };
    case "OPEN_DIALOG_JOIN":
      return { ...state, currentDialog: "join" };

    // CHAT - TODO


    // CONTEXT MENU - TODO

    default:
      return state;
  }
};

export default dialog;

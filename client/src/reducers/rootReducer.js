import { combineReducers } from "redux";
import board from "./boardReducer";
import chat from "./chatReducer";
import dialog from "./dialogReducer";
import session from "./sessionReducer";
import theme from "./themeReducer";

export default combineReducers({
  board,
  chat,
  dialog,
  session,
  theme
});

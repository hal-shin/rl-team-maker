import { combineReducers } from "redux";
import board from "./boardReducer";
import chat from "./chatReducer";
import dialog from "./dialogReducer";
import session from "./sessionReducer";

export default combineReducers({
  board,
  chat,
  dialog,
  session,
});

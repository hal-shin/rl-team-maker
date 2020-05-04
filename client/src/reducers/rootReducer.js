import { combineReducers } from "redux";
import board from "./boardReducer";
// import chat from "./chatReducer";
import session from "./sessionReducer";

export default combineReducers({
  board,
  session
  // chat,
});

import { combineReducers } from "redux";
import event from "./eventReducer";
import meta from "./metaReducer";
import chat from "./chatReducer";

export default combineReducers({
  event,
  meta,
  chat
});

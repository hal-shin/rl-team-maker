import { combineReducers } from "redux";
import event from "./eventReducer";
import meta from "./metaReducer";
import chat from "./chatReducer";
import user from "./userReducer";

export default combineReducers({
  event,
  meta,
  chat,
  user
});

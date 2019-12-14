import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import AdReducer from "./AdReducer"

export default combineReducers({
  auth: AuthReducer,
  ad: AdReducer
});

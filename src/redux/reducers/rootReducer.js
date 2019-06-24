import userAuthReducer from "./userAuthReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
  user: userReducer
});

export default rootReducer;

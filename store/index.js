import { composeWithDevTools } from "@redux-devtools/extension";
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import user from "./user/userReducer";
import thread from "./thread/threadReducer";
import message from "./message/messageReducer";

const RootReducers = combineReducers({
  user,
  thread,
  message,
});

const middleware = [thunk];

export const store = createStore(
  RootReducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

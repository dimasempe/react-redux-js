import { combineReducers } from "redux";
import { userReducer } from "./reducer/user";
import { counterReducer } from "./reducer/counter";

export const rootReducer = combineReducers({
    user:userReducer,
    counter:counterReducer
});
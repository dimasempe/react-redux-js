import { combineReducers } from "redux";
import { userReducer } from "./reducer/user";
import { counterReducer } from "./reducer/counter";
import { cartReducer } from "./reducer/cart";
import { legacy_createStore } from "redux";

export const rootReducer = combineReducers({
    user:userReducer,
    counter:counterReducer,
    cart:cartReducer
});

export const globalStore = legacy_createStore(rootReducer);

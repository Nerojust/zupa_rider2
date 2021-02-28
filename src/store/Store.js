import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "../store/reducers/LoginReducer";
const middlewares = [thunk];

// you can add as many reducers here
const rootReducer = combineReducers({
  login: loginReducer,
});

//make the store available for use
export default createStore(rootReducer, applyMiddleware(...middlewares));

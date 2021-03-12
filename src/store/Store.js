import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "../store/reducers/LoginReducer";
import { orderReducer } from "../store/reducers/OrderReducer";
import { searchReducer } from "../store/reducers/SearchReducer";
const middlewares = [thunk];

// you can add as many reducers here
const rootReducer = combineReducers({
  login: loginReducer,
  orders: orderReducer,
  search: searchReducer,
});

//make the store available for use
export default createStore(rootReducer, applyMiddleware(...middlewares));

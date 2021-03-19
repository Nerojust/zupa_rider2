// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import { loginReducer } from "../store/reducers/LoginReducer";
// import { orderReducer } from "../store/reducers/OrderReducer";
// import { searchReducer } from "../store/reducers/SearchReducer";
// const middlewares = [thunk];

// // you can add as many reducers here
// const rootReducer = combineReducers({
//   login: loginReducer,
//   orders: orderReducer,
//   search: searchReducer,
// });

// //make the store available for use
// export default createStore(rootReducer, applyMiddleware(...middlewares));

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "../store/reducers/LoginReducer";
import { orderReducer } from "../store/reducers/OrderReducer";
import { searchReducer } from "../store/reducers/SearchReducer";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
const middlewares = [thunk];

// you can add as many reducers here
const rootReducer = combineReducers({
  login: loginReducer,
  orders: orderReducer,
  search: searchReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  //whitelist: ["loginResults", "userToken"],
};

//make the store available for use
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);

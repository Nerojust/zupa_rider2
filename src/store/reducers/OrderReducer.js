import { ORDER,ERROR } from "../ActionTypes";
import { initialState } from "../State";

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER:
      return { ...state, orders: action.payload };

    case ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

import { SEARCH } from "../ActionTypes";
import { initialState } from "../State";

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      //console.log("search action is ",action.isSearch)
      return { ...state, isSearchClicked: action.isSearch };

    default:
      return state;
  }
};

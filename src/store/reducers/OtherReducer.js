import { NEW_PAGE } from "../ActionTypes";
import { initialState } from "../State";

export const OtherReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_PAGE:
      //console.log("search action is ",action.isSearch)
      return { ...state, isBackToNewPage: action.isBackToNewPage };

    default:
      return state;
  }
};

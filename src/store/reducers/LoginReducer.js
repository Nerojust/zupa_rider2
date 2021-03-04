import {
    LOGIN,
    ERROR,
    LOADING_ENDED,
    LOGOUT,
    LOADING_STARTED,
  } from "../ActionTypes";
  import { initialState } from "../State";
  
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        //console.log("reducer login is ", action.payload)
        return {
          ...state,
          loginResults: action.payload,
          userToken: action.token,
          loginStatus: action.isLoggedIn,
          
        };
  
      case ERROR:
        //console.log("action error is ", action.error)
        return { ...state, error: action.error };
  
      case LOGOUT:
        return {
          ...state,
          loginResults: null,
          userToken: null,
          isLoggedIn: action.isLoggedIn,
        };
  
      case LOADING_STARTED:
        return { ...state, isLoading: action.isLoading };
  
      case LOADING_ENDED:
        return { ...state, isLoading: action.isLoading };
  
      default:
        return state;
    }
  };
  
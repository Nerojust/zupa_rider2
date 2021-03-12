import {
  LOGIN,
  LOADING_ENDED,
  LOADING_STARTED,
  LOGOUT,
  ERROR,
  ISNETWORK_AVAIALBLE,
  ORDER,
  SEARCH,
} from "./ActionTypes";

export const saveNetworkState = (status) => {
  return {
    type: ISNETWORK_AVAIALBLE,
    networkStatus: status,
  };
};

export const saveOrder = (data) => {
  //console.log("order action", data)
  return {
    type: ORDER,
    payload: data,
  };
};

export const setError = (error) => {
  alert(error);
  return {
    type: ERROR,
    error: error,
  };
};

export const saveSearchState = (state) => {
  //console.log("data", data)
  return {
    type: SEARCH,
    isSearch: state,
  };
};
export const loginUser = (data) => {
  //console.log("data", data)
  return {
    type: LOGIN,
    payload: data,
    token: data.jwt,
    isLoggedIn: true,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
    payload: null,
    userToken: null,
    isLoggedIn: false,
  };
};

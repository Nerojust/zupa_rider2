import {
  LOGIN,
  LOADING_ENDED,
  LOADING_STARTED,
  LOGOUT,
  ERROR,
  ISNETWORK_AVAIALBLE,
  ORDER,
} from "./ActionTypes";

export const saveNetworkState = (status) => {
  return {
    type: ISNETWORK_AVAIALBLE,
    networkStatus: status,
  };
};

export const saveOrder = (data) => {
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

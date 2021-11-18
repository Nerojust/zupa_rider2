import { useContext } from "react";
import { AuthContext } from "../utils/Context";
import { LOGIN_URL } from "../utils/Urls";
import {
  LOGIN,
  LOADING_ENDED,
  LOADING_STARTED,
  LOGOUT,
  ERROR,
  ISNETWORK_AVAIALBLE,
  ORDER,
  SEARCH,
  NEW_PAGE,
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

export const saveNavState = (state) => {
  //console.log("data", data)
  return {
    type: NEW_PAGE,
    isBackToNewPage: state,
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

export const login = ({ phoneNumber, pin }) => {
  return async (dispatch) => {
    fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        pin: pin,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("LOGIN RESPONSE", response);
        var token = response.jwt;
        dispatch({
          type: LOGIN,
          payload: response,
          token: token,
        });

        return response;
      })
      .catch((error) => {
        console.log("login error block", error);
        dispatch({
          type: ERROR,
          error: error,
        });
        if (error?.response?.message) {
          alert(error?.response?.message);
        }
      });
  };
};

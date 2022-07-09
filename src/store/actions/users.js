import { getZupaClient } from '../../utils/Api';
import {clearStorage, handleError} from '../../utils/utils';

export const login = (payload) => {
  console.log('About to login with ', payload);

  return (dispatch) => {
    dispatch({
      type: 'LOGIN_PENDING',
      loading: true,
      error: null,
    });
    return getZupaClient()
      .post(`/auth/rider/login`, payload)
      .then(async (response) => {
        if (response.data) {
          console.log(
            'Login successful, rider is',
            response.data.rider.name,
          );

          if (!response.code) {
            if (response.data.rider && response.data.jwt) {
              const accessToken = response.data.jwt;
              const profile = response.data.rider;
              console.log('user profile', profile);
              getZupaClient().defaults.headers.common[
                'Authorization'
              ] = `Bearer ${accessToken}`;

              dispatch({
                type: 'LOGIN_SUCCESS',
                loading: false,
                user: response.data,
                accessToken: accessToken,
                error: null,
              });
            } else {
              console.log(response.message);
              //dispatch(setError(responseJson.message));
              handleError(
                response.message == 'jwt malformed'
                  ? 'Oops! Server error, please try again later'
                  : response.message,
                dispatch,
              );
            }
          }

          return response.data;
        }
      })
      .catch((error) => {
        console.log('Login failed:', error?.response?.data?.message);
        dispatch({
          type: 'LOGIN_FAILED',
          loading: false,
          error: error.message,
        });
        if (!error.response.data.message) {
          handleError(error, dispatch);
        } else {
          alert(error.response.data.message);
        }
      });
  };
};

export const logoutUser = () => {
  console.log('logged out user');
  //navigation.goBack();

  return (dispatch) => {
    dispatch({
      type: 'LOGOUT_USER',
      user: null,
      accessToken: '',
    });
    clearStorage();
  };
};

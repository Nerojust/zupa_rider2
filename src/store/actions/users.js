import client from '../../utils/Api';
import {clearStorage, handleError} from '../../utils/utils';

export const login = (payload) => {
  console.log('About to login with ', payload);

  return (dispatch) => {
    dispatch({
      type: 'LOGIN_PENDING',
      loading: true,
      error: null,
    });
    return client
      .post(`/auth/rider/login`, payload)
      .then(async (response) => {
        if (response.data) {
          console.log('Login successful, status code is ', response.data.rider.name);

          if (!response.code) {
            if (response.data.rider && response.data.jwt) {
              const accessToken = response.data.jwt;
              const profile = response.data.rider;
              console.log("jjjjjjjjjj")
              client.defaults.headers.common[
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
        console.log('Login failed:', error.message);
        dispatch({
          type: 'LOGIN_FAILED',
          loading: false,
          error: error.message,
        });

        handleError(error, dispatch);
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
      accessToken: ''
    });
    clearStorage();
  };
};

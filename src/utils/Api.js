import axios from 'axios';
import axios2 from 'axios';

let localBase;
if (Platform.OS == 'android') {
  localBase = '10.0.2.2';
} else {
  localBase = 'localhost';
}
//const baseURL_kitchen = `http://${localBase}:8089/api`;
const baseURL_kitchen = 'https://gourmet-kitchen-api-oq8ef.ondigitalocean.app/api/';

//const baseURL_zupa = 'https://dev.api.zupa.ng'; //new dev link
const baseURL_zupa = 'https://api.zupa.ng'; //new prod link
// const baseURL_zupa = 'https://zupa-api.dev.intelia.io'; //dev link
//const baseURL_zupa = 'https://zupa-prod-api.dev.intelia.io'; //prod link

let zupaClient = axios.create({
  baseURL: baseURL_zupa,
});

let kitchenClient = axios2.create({
  baseURL: baseURL_kitchen,
});

export const getZupaClient = () => {
  zupaClient.interceptors.response.use(
    function (response) {
      //console.log('rrhhhhhr', response.status);
      if (response.status == 200 || 201) {
        return Promise.resolve(response);
      } else {
        // console.log('eeeee', response?.data?.message);
        alert(
          response.data.message ||
            'Server error occured, please try again later',
        );
      }
    },
    (error) => {
      console.log('errrrrrrorrr', error);
      //return Promise.reject(error);
      if (error?.response?.status == 401) {
        //console.log('401 error', error?.response);
        //   alert(
        //     'Session Expired',
        //     'Your session has expired. Would you like to be redirected to the login page?',
        //   ).then(async () => {
        //     clearStorage();
        //   });
      } else {
        console.log('full error is ', error.response.data.message);
        return Promise.reject(error);
      }
    },
  );

  return zupaClient;
};

export const getKitchenClient = () => {
  kitchenClient.interceptors.response.use(
    function (response) {
      //console.log('rrhhhhhr', response.status);
      if (response.status == 200 || 201) {
        return Promise.resolve(response);
      } else {
        // console.log('eeeee', response?.data?.message);
        alert(
          response.data.message ||
            'Server error occured, please try again later',
        );
      }
    },
    (error) => {
      // console.log('errrrrrrorrr', error);
      //return Promise.reject(error);
      if (error?.response?.status == 401) {
        //console.log('401 error', error?.response);
        //   alert(
        //     'Session Expired',
        //     'Your session has expired. Would you like to be redirected to the login page?',
        //   ).then(async () => {
        //     clearStorage();
        //   });
      } else {
        console.log('full error is ', error?.response?.data?.message);
        return Promise.reject(error);
      }
    },
  );
  return kitchenClient;
};

module.exports = {getZupaClient, getKitchenClient};

import client from '../../utils/Api';
import {dateFilterParser} from '../../utils/DateFilter';
import {handleError} from '../../utils/utils';

export const getAllPendingOrders = () => {
  console.log('About to get all pending orders');

  return async (dispatch) => {
    dispatch({
      type: 'FETCH_ALL_PENDING_ORDERS_PENDING',
      loading: true,
      error: null,
    });
    var getUrl = `/rider-requests?status=started&status=pending`;
    //console.log('geturl', getUrl);
    return client
      .get(getUrl)
      .then(async (response) => {
        if (response.data) {
          const {data, offset, limit, total} = response || [];
          // console.log(total, limit, offset);
          console.log('Pending Orders gotten successfully', response.data.length);

          dispatch({
            type: 'FETCH_ALL_PENDING_ORDERS_SUCCESS',
            loading: false,
            pendingOrders: data,
            //orders: data,
          });

          return response.data;
        }
      })
      .catch((error) => {
        console.log('Getting pending orders failed', error);
        handleError(error, 'get orders list');
        dispatch({
          type: 'FETCH_ALL_PENDING_ORDERS_FAILED',
          loading: false,
          error: error.message,
        });
      });
  };
};
export const getAllCompletedOrders = () => {
  console.log('About to get all completed orders');

  return async (dispatch) => {
    dispatch({
      type: 'FETCH_ALL_COMPLETED_ORDERS_PENDING',
      loading: true,
      error: null,
    });
    var getUrl = `/rider-requests?status=completed`;
    //console.log('geturl', getUrl);
    return client
      .get(getUrl)
      .then(async (response) => {
        if (response.data) {
          const {data, offset, limit, total} = response || [];
          // console.log(total, limit, offset);
          console.log('completed Orders gotten successfully', response.data.length);

          dispatch({
            type: 'FETCH_ALL_COMPLETED_ORDERS_SUCCESS',
            loading: false,
            completedOrders: data,
          });

          return response.data;
        }
      })
      .catch((error) => {
        console.log('Getting completed orders failed', error);
        handleError(error, 'get orders list');
        dispatch({
          type: 'FETCH_ALL_COMPLETED_ORDERS_FAILED',
          loading: false,
          error: error.message,
        });
      });
  };
};
export const getAllOrdersWithDate = (startDate = '', endDate = '') => {
  console.log('About to get all orders with date', startDate, endDate);

  return async (dispatch) => {
    dispatch({
      type: 'FETCH_ALL_ORDERS_WITH_DATE_PENDING',
      loading: true,
      error: null,
    });
    var getUrl = `/rider-requests/?status=completed&startDate=${startDate}&endDate=${endDate}`;
    //console.log('geturl', getUrl);
    return client
      .get(getUrl)
      .then(async (response) => {
        if (response.data) {
          const {data, offset, limit, total} = response || [];
          // console.log(total, limit, offset);
          console.log('Orders with date gotten successfully', response.data.length);

          dispatch({
            type: 'FETCH_ALL_ORDERS_WITH_DATE_SUCCESS',
            loading: false,
            completedOrders: data,
            orders: data,
          });

          return response.data;
        }
      })
      .catch((error) => {
        console.log('Getting orders with date failed', error);
        handleError(error, 'get orders list');
        dispatch({
          type: 'FETCH_ALL_ORDERS_WITH_DATE_FAILED',
          loading: false,
          error: error.message,
        });
      });
  };
};

export const getOrder = (parentId) => {
  console.log('About to get all orders');

  return async (dispatch) => {
    dispatch({
      type: 'GET_ORDER_PENDING',
      loading: true,
      error: null,
    });
    var getUrl = `/rider-requests`;
    //console.log('geturl', getUrl);
    return client
      .get(getUrl)
      .then(async (response) => {
        if (response.data) {
          const {data} = response || [];
          // console.log(total, limit, offset);
          console.log('Orders gotten successfully', response.data.length);

          var result = await data.find((item, i) => item.id == parentId);
          if (result) {
            // console.log('Found the result in actions');
            dispatch({
              type: 'GET_ORDER_SUCCESS',
              loading: false,
              order: result,
            });
          }

          return result;
        }
      })
      .catch((error) => {
        console.log('Getting orders failed', error);
        handleError(error, 'get orders list');
        dispatch({
          type: 'GET_ORDER_FAILED',
          loading: false,
          error: error.message,
        });
      });
  };
};

export const patchOrder = (orderId, payload) => {
  return (dispatch) => {
    console.log('About to patch order with id ', orderId);
    dispatch({
      type: 'PATCH_ORDER_PENDING',
      loading: true,
      error: null,
    });

    return client
      .patch(`/rider-requests/${orderId}`, payload)
      .then((response) => {
        if (response.data) {
          console.log('Order patched successfully');

          dispatch({
            type: 'PATCH_ORDER_SUCCESS',
            loading: false,
          });
          dispatch(getAllPendingOrders());
          return response.data;
        }
      })
      .catch((error) => {
        handleError(error, 'update order');
        console.log('Error patching order', error);
        dispatch({
          type: 'PATCH_ORDER_FAILED',
          loading: false,
          error:
            error.message ||
            error.response ||
            error.response.data ||
            error.response.message ||
            error.response.data.message,
        });
      });
  };
};
export const patchOrderMarkComplete = (orderId, payload) => {
  return (dispatch) => {
    console.log('About to patch order with id ', orderId);
    dispatch({
      type: 'PATCH_ORDER_PENDING',
      loading: true,
      error: null,
    });

    return client
      .patch(`/rider-requests/${orderId}`, payload)
      .then((response) => {
        if (response.data) {
          console.log('Order patched successfully');

          dispatch({
            type: 'PATCH_ORDER_SUCCESS',
            loading: false,
          });
          dispatch(getAllPendingOrders());
          return response.data;
        }
      })
      .catch((error) => {
        handleError(error, 'update order');
        console.log('Error patching order', error);
        dispatch({
          type: 'PATCH_ORDER_FAILED',
          loading: false,
          error:
            error.message ||
            error.response ||
            error.response.data ||
            error.response.message ||
            error.response.data.message,
        });
      });
  };
};
export const patchEndTrip = (orderId, payload) => {
  return (dispatch) => {
    console.log('About to patch order with id ', orderId);
    dispatch({
      type: 'PATCH_ORDER_PENDING',
      loading: true,
      error: null,
    });

    return client
      .patch(`/rider-requests/${orderId}`, payload)
      .then((response) => {
        if (response.data) {
          console.log('Order patched successfully');

          dispatch({
            type: 'PATCH_ORDER_SUCCESS',
            loading: false,
          });
          dispatch(getAllPendingOrders());
          return response.data;
        }
      })
      .catch((error) => {
        handleError(error, 'update order');
        console.log('Error patching order', error);
        dispatch({
          type: 'PATCH_ORDER_FAILED',
          loading: false,
          error:
            error.message ||
            error.response ||
            error.response.data ||
            error.response.message ||
            error.response.data.message,
        });
      });
  };
};

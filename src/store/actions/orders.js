import {getKitchenClient} from '../../utils/Api';
import {KITCHEN_APP_TOKEN} from '../../utils/Constants';
import {dateFilterParser, getDateWithoutTime} from '../../utils/DateFilter';
import {handleError} from '../../utils/utils';

export const getAllPendingOrders = (riderId, date) => {
  console.log('About to get all pending orders');
  getKitchenClient().defaults.headers.common[
    'Authorization'
  ] = `Bearer ${KITCHEN_APP_TOKEN}`;

  return async (dispatch) => {
    dispatch({
      type: 'FETCH_ALL_PENDING_ORDERS_PENDING',
      loading: true,
      error: null,
    });
    var getUrl = `/dispatch/rider/orders`;
    let payload = {
      startDate: date + 'T00:00:01',
      endDate: date + 'T23:59:00',
      riderId: riderId,
      status: 'pending',
    };
    
    console.log('payload', payload);
    return getKitchenClient()
      .post(getUrl, payload)
      .then(async (response) => {
        //console.log('bababa', response.data);
        if (response?.data?.isSuccessful && response?.data?.results) {
          console.log(
            'Pending Orders gotten successfully',
            response?.data?.results.length,
          );

          dispatch({
            type: 'FETCH_ALL_PENDING_ORDERS_SUCCESS',
            loading: false,
            pendingOrders: response?.data?.results,
          });

          return response?.data?.results;
        } else {
          alert(response?.data?.message);
          dispatch({
            type: 'FETCH_ALL_PENDING_ORDERS_FAILED',
            loading: false,
            error: error.message,
          });
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

export const getAllCompletedOrders = (riderId, startDate, endDate) => {
  console.log('About to get all completed orders');
  getKitchenClient().defaults.headers.common[
    'Authorization'
  ] = `Bearer ${KITCHEN_APP_TOKEN}`;

  return async (dispatch) => {
    dispatch({
      type: 'FETCH_ALL_COMPLETED_ORDERS_PENDING',
      loading: true,
      error: null,
    });
    var getUrl = `/dispatch/rider/orders`;
    let payload = {
      startDate: startDate + 'T00:00:01',
      endDate: endDate + 'T23:59:00',
      riderId: riderId,
      status: 'completed',
    };

    console.log('payload', payload);
    return getKitchenClient()
      .post(getUrl, payload)
      .then(async (response) => {
        //console.log('bababa', response.data);
        if (response?.data?.isSuccessful && response?.data?.results) {
          console.log(
            'Completed Orders gotten successfully',
            response?.data?.results.length,
          );

          dispatch({
            type: 'FETCH_ALL_COMPLETED_ORDERS_SUCCESS',
            loading: false,
            data: response?.data?.results,
          });

          return response?.data?.results;
        } else {
          alert(response?.data?.message);
          dispatch({
            type: 'FETCH_ALL_COMPLETED_ORDERS_FAILED',
            loading: false,
            error: error.message,
          });
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
    var getUrl = `/rider/dispatches/?$include=dispatch_orders.order.customer&status=completed&$order=-updatedAt&startDate=${startDate}&endDate=${endDate}`;
    console.log('geturl', getUrl);
    return getKitchenClient()
      .get(getUrl)
      .then(async (response) => {
        if (response.data) {
          const {data, offset, limit, total} = response || [];
          // console.log(total, limit, offset);
          console.log(
            'Orders with date gotten successfully',
            response.data.length,
          );

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

export const getOrder = (id) => {
  console.log('About to get single dispatch order with id ' + id);

  return async (dispatch) => {
    dispatch({
      type: 'GET_ORDER_PENDING',
      loading: true,
      error: null,
    });
    var getUrl = `/dispatch/status/${id}`;
    //console.log('geturl', getUrl);
    return getKitchenClient()
      .get(getUrl)
      .then(async (response) => {
        if (response?.data?.isSuccessful && response?.data?.results) {
          console.log('single order gotten successfully');

          dispatch({
            type: 'GET_ORDER_SUCCESS',
            loading: false,
            order: response?.data?.results[0],
          });

          return response?.data?.results[0];
        }
      })
      .catch((error) => {
        console.log('Getting sigle order failed', error);
        handleError(error, 'get orders list');
        dispatch({
          type: 'GET_ORDER_FAILED',
          loading: false,
          error: error.message,
        });
      });
  };
};

export const updateDispatchStatus = (
  dispatchId,
  payload,
  riderId,
  isSingleOrder = false,
) => {
  return (dispatch) => {
    console.log('About to patch dispatch with id ', dispatchId);

    dispatch({
      type: 'PATCH_ORDER_PENDING',
      loading: true,
      error: null,
    });

    return getKitchenClient()
      .patch(`/dispatch/status/${dispatchId}`, payload)
      .then((response) => {
        if (response?.data?.isSuccessful && response?.data?.results) {
          console.log('dispatch Order patched successfully');

          dispatch({
            type: 'PATCH_ORDER_SUCCESS',
            loading: false,
          });
          if (!isSingleOrder) {
            dispatch(
              getAllPendingOrders(riderId, getDateWithoutTime(new Date())),
            );
          } else {
            dispatch(getOrder(dispatchId));
          }
          return response.data;
        } else {
          alert(response.data.message);
          dispatch({
            type: 'PATCH_ORDER_FAILED',
            loading: false,
            error: error.message,
          });
        }
      })
      .catch((error) => {
        handleError(error, 'update order');
        console.log('Error patching order', error);
        dispatch({
          type: 'PATCH_ORDER_FAILED',
          loading: false,
          error: error.message,
        });
      });
  };
};
export const patchOrderMarkComplete = (orderId, payload) => {
  return (dispatch) => {
    console.log('About to patch order complete with id ', orderId);
    dispatch({
      type: 'PATCH_ORDER_PENDING',
      loading: true,
      error: null,
    });

    return getKitchenClient()
      .put(`/rider/dispatch-orders/${orderId}`, payload)
      .then((response) => {
        if (response.data) {
          console.log('Order patched complete successful');

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
        console.log('Error patching complete order', error);
        dispatch({
          type: 'PATCH_ORDER_FAILED',
          loading: false,
          error: error.message,
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

    return getKitchenClient()
      .put(`/rider/dispatches/${orderId}`, payload)
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

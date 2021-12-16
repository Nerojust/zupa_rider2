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
    var getUrl = `/rider/dispatches/?$include=dispatch_orders.order.customer&$order=-updatedAt&status=started&status=pending`;
    //var getUrl = `/rider-requests?status=started&status=pending`;
    //console.log('geturl', getUrl);
    return client
      .get(getUrl)
      .then(async (response) => {
        if (response.data) {
          const {data, offset, limit, total} = response.data || [];

          console.log('Pending Orders gotten successfully', data.length);

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
    var getUrl = `/rider/dispatches/?$include=dispatch_orders.order.customer&status=completed&$order=-updatedAt`;
    //console.log('geturl', getUrl);
    return client
      .get(getUrl)
      .then(async (response) => {
        if (response.data) {
          const {data, offset, limit, total} = response?.data || [];
          // console.log(total, limit, offset);
          console.log(
            'completed Orders gotten successfully',
            data.length,
          );

          dispatch({
            type: 'FETCH_ALL_COMPLETED_ORDERS_SUCCESS',
            loading: false,
            completedOrders: data,
          });

          return data;
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
    return client
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

export const getOrder = (parentId) => {
  console.log('About to get single order with parent id ' + parentId);

  return async (dispatch) => {
    dispatch({
      type: 'GET_ORDER_PENDING',
      loading: true,
      error: null,
    });
    var getUrl = `/rider/dispatches/${parentId}?$include=dispatch_orders.order.customer`;
    //console.log('geturl', getUrl);
    return client
      .get(getUrl)
      .then(async (response) => {
        if (response.data) {
          const {data} = response || [];
          // console.log(total, limit, offset);
          console.log('single order gotten successfully');

          dispatch({
            type: 'GET_ORDER_SUCCESS',
            loading: false,
            order: data,
          });

          return data;
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

export const patchParentOrder = (dispatchId, payload, isDashboard) => {
  return (dispatch) => {
    console.log('About to patch dispatch with id ', dispatchId);

    dispatch({
      type: 'PATCH_ORDER_PENDING',
      loading: true,
      error: null,
    });

    return client
      .put(`/rider/dispatches/${dispatchId}`, payload)
      .then((response) => {
        if (response.data) {
          console.log('dispatch Order patched successfully');

          dispatch({
            type: 'PATCH_ORDER_SUCCESS',
            loading: false,
          });

          if (isDashboard) {
            dispatch(getAllPendingOrders());
          } else {
            dispatch(getOrder(dispatchId));
          }
          return response.data;
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

    return client
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

    return client
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

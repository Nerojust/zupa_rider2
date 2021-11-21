import client from '../../utils/Api';
import {dateFilterParser} from '../../utils/DateFilter';
import {handleError} from '../../utils/utils';

export const getAllOrders = () => {
  console.log('About to get all orders');

  return async (dispatch) => {
    dispatch({
      type: 'FETCH_ALL_ORDERS_PENDING',
      loading: true,
      error: null,
    });
    var getUrl = `/rider-requests`;
    //console.log('geturl', getUrl);
    return client
      .get(getUrl)
      .then(async (response) => {
        if (response.data) {
          const {data, offset, limit, total} = response || [];
          // console.log(total, limit, offset);
          console.log('Orders gotten successfully', response.data.length);

          dispatch({
            type: 'FETCH_ALL_ORDERS_SUCCESS',
            loading: false,
            orders: data,
            meta: {
              total,
              limit,
              offset,
              page: 1 + offset / limit,
              pageSize: limit,
              pageTotal: Math.ceil(total / limit),
            },
          });

          return response.data;
        }
      })
      .catch((error) => {
        console.log('Getting orders failed', error);
        handleError(error, 'get orders list');
        dispatch({
          type: 'FETCH_ALL_ORDERS_FAILED',
          loading: false,
          error: error.message,
        });
      });
  };
};

export const getOrder = (id) => {
  console.log('About to get single order with id', id);
  return (dispatch) => {
    dispatch({
      type: 'GET_ORDER_PENDING',
      loading: true,
      error: null,
    });
    return client
      .get(`/rider-requests/${id}`)
      .then((response) => {
        if (response.data) {
          console.log('Single order gotten successfully');
          dispatch({
            type: 'GET_ORDER_SUCCESS',
            loading: false,
            order:response.data
          });
          return response.data;
        }
      })

      .catch((error) => {
        console.log('Error getting single order', error);
        handleError(error, 'get order');
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
    console.log('About to patch order with ids ', orderId);
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
          dispatch(getAllOrders());
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

import { INDEX_PAGE_SIZE_DEFAULT, INDEX_PAGE_SIZE_OPTIONS, LIMIT_FIGURE } from "../../utils/utils";


const initialState = {
  order: null,
  orders: [],
  dashboardOrders: [],
  onlineOrders: [],
  distributionData: [],
  error: false,
  dashboarderror: false,
  loading: false,
  ordersLoading: true,
  getOrderLoading: false,
  createOrderLoading: false,
  patchOrderLoading: false,
  hasFetchedOrders: false,
  hasFetchedOrdersWithStatus: false,
  hasUpdatedOrderStatus: false,
  hasPatchedOrder: false,

  meta: {
    total: 0,
    page: 1,
    offset: 0,
    limit: LIMIT_FIGURE,
    pageSize: INDEX_PAGE_SIZE_DEFAULT,
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    pageTotal: 1,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ORDER_DATA':
      return initialState;

    case 'FETCH_ALL_ORDERS_PENDING':
      return {
        ...state,
        hasFetchedOrders: false,
        ordersLoading: action.loading,
      };
    case 'FETCH_ALL_ORDERS_SUCCESS': {
      return {
        ...state,
        orders: action.orders,
        meta: {...state.meta, ...action.meta},
        hasCreatedOrder: false,
        hasDeletedOrder: false,
        hasFetchedOrders: true,
        ordersLoading: action.loading,
      };
    }
    case 'FETCH_ALL_ORDERS_FAILED':
      return {
        ...state,
        ordersLoading: action.loading,
        hasFetchedOrders: false,
        error: action.error,
      };

    case 'GET_ORDER_PENDING':
      return {...state, getOrderLoading: action.loading};
    case 'GET_ORDER_SUCCESS':
      return {...state, order: action.order, getOrderLoading: action.loading};
    case 'GET_ORDER_FAILED':
      return {...state, getOrderLoading: action.loading, error: action.error};

    case 'UPDATE_ORDER_STATUS_PENDING':
      return {...state, loading: action.loading};
    case 'UPDATE_ORDER_STATUS_SUCCESS':
      return {
        ...state,
        hasUpdatedOrderStatus: action.hasUpdatedOrderStatus,
        loading: action.loading,
      };
    case 'UPDATE_ORDER_STATUS_FAILED':
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };

    case 'PATCH_ORDER_PENDING':
      return {...state, patchOrderLoading: action.loading};
    case 'PATCH_ORDER_SUCCESS':
      return {
        ...state,
        hasPatchedOrder: true,
        patchOrderLoading: action.loading,
      };
    case 'PATCH_ORDER_FAILED':
      return {
        ...state,
        patchOrderLoading: action.loading,
        error: action.error,
      };

    default:
      return state;
  }
};

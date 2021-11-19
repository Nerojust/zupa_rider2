const initialState = {
  user: null,
  users: [],
  error: '',
  loading: false,
  usersLoading: false,
  getUserLoading: false,
  loginError: null,
  accessToken: null,
  profile: [],
  store: undefined,
  storeAndWallet: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_ERROR':
      return {
        ...state,
        error: action.error,
      };

    case 'LOGIN_USER':
      return {
        ...state,
        profile: action.profile,
        accessToken: action.accessToken,
      };
    case 'LOGIN_PENDING':
      return {...state, loading: action.loading};
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.user,
        loading: action.loading,
        accessToken: action.accessToken,
        loginError: null,
      };
    case 'LOGIN_FAILED':
      return {...state, loading: action.loading, loginError: action.error};

    case 'LOGOUT_USER':
      return {
        ...state,
        user: action.user,
        profile: null,
        accessToken: null,
      };
    default:
      return state;
  }
};

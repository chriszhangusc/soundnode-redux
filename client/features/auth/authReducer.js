import {
  AUTH_USER_LOGOUT_SUCCEEDED,
  AUTH_FAVORITES_SET,
  AUTH_SESSION_SET,
  AUTH_FAVORITES_ADD,
  AUTH_FAVORITES_REMOVE,
  AUTH_USER_LOGIN_STARTED,
  AUTH_USER_LOGIN_SUCCEEDED,
  AUTH_USER_LOGIN_FAILED,
  AUTH_REPOSTS_ADD,
  AUTH_REPOSTS_REMOVE,
  AUTH_REPOSTS_SET,
} from './authConsts';

/* Reducer */
const initialState = {
  me: null,
  loginInProgress: false,
  session: null,
  favoriteTracks: [],
  reposts: [],
};

// #TODO: Should we extract fetchOffset?
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_LOGIN_STARTED:
      return {
        ...state,
        loginInProgress: true,
      };
    case AUTH_USER_LOGIN_SUCCEEDED:
      return {
        ...state,
        loginInProgress: false,
        me: { ...action.payload },
      };
    case AUTH_USER_LOGIN_FAILED:
      return {
        ...initialState,
      };
    case AUTH_SESSION_SET:
      return {
        ...state,
        session: { ...action.payload },
      };

    case AUTH_USER_LOGOUT_SUCCEEDED:
      return { ...initialState };

    case AUTH_FAVORITES_SET:
      return {
        ...state,
        favoriteTracks: [...action.payload.favorites],
      };

    case AUTH_FAVORITES_ADD:
      return {
        ...state,
        favoriteTracks: [...state.favoriteTracks, action.payload],
      };

    case AUTH_FAVORITES_REMOVE:
      return {
        ...state,
        favoriteTracks: state.favoriteTracks.filter(x => x !== action.payload),
      };

    case AUTH_REPOSTS_ADD:
      return {
        ...state,
        reposts: [...state.reposts, action.payload.trackId],
      };
    case AUTH_REPOSTS_REMOVE:
      return {
        ...state,
        reposts: state.reposts.filter(x => x !== action.payload.trackId),
      };
    case AUTH_REPOSTS_SET:
      return {
        ...state,
        reposts: [...action.payload.reposts],
      };
    default:
      return state;
  }
}

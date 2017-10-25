import * as types from './authActionTypes';

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
    case types.AUTH_USER_ME_SET:
      return {
        ...state,
        me: { ...action.payload.me },
      };
    case types.AUTH_USER_LOGIN_STARTED:
      return {
        ...state,
        loginInProgress: true,
      };
    case types.AUTH_USER_LOGIN_SUCCEEDED:
      return {
        ...state,
        loginInProgress: false,
      };
    case types.AUTH_USER_LOGIN_FAILED:
      return {
        ...initialState,
      };
    case types.AUTH_SESSION_SET:
      return {
        ...state,
        session: { ...action.payload },
      };

    case types.AUTH_USER_LOGOUT_SUCCEEDED:
      return { ...initialState };

    case types.AUTH_FAVORITES_SET:
      return {
        ...state,
        favoriteTracks: [...action.payload.favorites],
      };

    case types.AUTH_FAVORITES_ADD:
      return {
        ...state,
        favoriteTracks: [...state.favoriteTracks, action.payload],
      };

    case types.AUTH_FAVORITES_REMOVE:
      return {
        ...state,
        favoriteTracks: state.favoriteTracks.filter(x => x !== action.payload),
      };

    case types.AUTH_REPOSTS_ADD:
      return {
        ...state,
        reposts: [...state.reposts, action.payload.trackId],
      };
    case types.AUTH_REPOSTS_REMOVE:
      return {
        ...state,
        reposts: state.reposts.filter(x => x !== action.payload.trackId),
      };
    case types.AUTH_REPOSTS_SET:
      return {
        ...state,
        reposts: [...action.payload.reposts],
      };
    default:
      return state;
  }
}

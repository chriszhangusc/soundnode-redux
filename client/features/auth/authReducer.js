import * as actionTypes from './authActionTypes';

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
    case actionTypes.AUTH_USER_ME_SET:
      return {
        ...state,
        me: { ...action.payload.me },
      };
    case actionTypes.AUTH_USER_LOGIN_STARTED:
      return {
        ...state,
        loginInProgress: true,
      };
    case actionTypes.AUTH_USER_LOGIN_SUCCEEDED:
      return {
        ...state,
        loginInProgress: false,
      };
    case actionTypes.AUTH_USER_LOGIN_FAILED:
      return {
        ...initialState,
      };
    case actionTypes.AUTH_SESSION_SET:
      return {
        ...state,
        session: { ...action.payload },
      };

    case actionTypes.AUTH_USER_LOGOUT_SUCCEEDED:
      return { ...initialState };

    case actionTypes.AUTH_FAVORITES_SET:
      return {
        ...state,
        favoriteTracks: [...action.payload.favorites],
      };

    case actionTypes.AUTH_FAVORITES_ADD:
      return {
        ...state,
        favoriteTracks: [...state.favoriteTracks, action.payload],
      };

    case actionTypes.AUTH_FAVORITES_REMOVE:
      return {
        ...state,
        favoriteTracks: state.favoriteTracks.filter(x => x !== action.payload),
      };

    case actionTypes.AUTH_REPOSTS_ADD:
      return {
        ...state,
        reposts: [...state.reposts, action.payload.trackId],
      };
    case actionTypes.AUTH_REPOSTS_REMOVE:
      return {
        ...state,
        reposts: state.reposts.filter(x => x !== action.payload.trackId),
      };
    case actionTypes.AUTH_REPOSTS_SET:
      return {
        ...state,
        reposts: [...action.payload.reposts],
      };
    default:
      return state;
  }
}

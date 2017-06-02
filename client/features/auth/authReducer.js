import {
  AUTH_USER_LOGIN_SUCCESS,
  AUTH_USER_LOGOUT_SUCCESS,
  AUTH_FAVORITES_SET,
  AUTH_SESSION_SET,
  AUTH_FAVORITES_ADD,
  AUTH_FAVORITES_REMOVE,
} from './authConsts';

/* Reducer */
const initialState = {
  me: null,
  session: null,
  favoriteTracks: [],
};

// #TODO: Should we extract fetchOffset?
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        me: { ...action.payload },
      };

    case AUTH_SESSION_SET:
      return {
        ...state,
        session: { ...action.payload },
      };

    case AUTH_USER_LOGOUT_SUCCESS:
      return { ...initialState };

    case AUTH_FAVORITES_SET:
      return {
        ...state,
        favoriteTracks: [...action.payload.result],
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
    default:
      return state;
  }
}

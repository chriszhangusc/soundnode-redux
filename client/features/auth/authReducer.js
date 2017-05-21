import {
  AUTH_USER_LOGIN_SUCCESS,
  AUTH_USER_LOGOUT,
  SET_OAUTH_TOKEN,
  SET_FAVORITE_TRACK_IDS,
} from './authConsts';

/* Reducer */
const initialState = {
  me: null,
  oauth_token: '',
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
    case AUTH_USER_LOGOUT:
      return { ...initialState };

    case SET_OAUTH_TOKEN:
      return {
        ...state,
        oauth_token: action.payload,
      };
    case SET_FAVORITE_TRACK_IDS:
      return {
        ...state,
        favoriteTracks: [...action.payload],
      };
    default:
      return state;
  }
}

import {
  USER_STATE_CLEAR,
  USER_REQUEST,
  USER_RECEIVE,
  USER_TRACKS_REQUEST,
  USER_TRACKS_RECEIVE,
} from './userProfileConsts';

/* Reducer */
const initialState = {
  userFetching: false,
  tracksFetching: false,
  userId: undefined,
  trackIds: [],
  tracksNextHref: undefined,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_STATE_CLEAR:
      return initialState;
    case USER_REQUEST:
      return {
        ...state,
        userFetching: true,
      };
    case USER_RECEIVE:
      return {
        ...state,
        userId: action.payload.result,
        userFetching: false,
      };
    case USER_TRACKS_REQUEST:
      return {
        ...state,
        tracksFetching: true,
      };
    case USER_TRACKS_RECEIVE:
      return {
        ...state,
        trackIds: [...state.trackIds, ...action.payload.result],
        tracksFetching: false,
      };
    default:
      return state;
  }
}

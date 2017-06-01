import uniq from 'lodash/uniq';
import {
  USER_PROFILE_STATE_CLEAR,
  USER_PROFILE_USER_REQUEST,
  USER_PROFILE_USER_RECEIVED,
  USER_PROFILE_USER_FAILED,
  USER_PROFILE_TRACKS_REQUEST,
  USER_PROFILE_TRACKS_RECEIVED,
  USER_PROFILE_TRACKS_FAILED,
} from './userProfileConsts';

/* Reducer */
const initialState = {
  userFetching: false,
  tracksFetching: false,
  userId: null,
  trackIds: [],
  tracksNextHref: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE_STATE_CLEAR:
      return initialState;
    case USER_PROFILE_USER_REQUEST:
      return {
        ...state,
        userFetching: true,
      };
    case USER_PROFILE_USER_RECEIVED:
      return {
        ...state,
        userId: action.payload.result,
        userFetching: false,
      };
    case USER_PROFILE_USER_FAILED:
      return {
        ...state,
        userFetching: false,
      };
    case USER_PROFILE_TRACKS_REQUEST:
      return {
        ...state,
        tracksFetching: true,
      };

    case USER_PROFILE_TRACKS_RECEIVED:
      return {
        ...state,
        // There will be overlap in the data from SoundCloud
        trackIds: uniq([...state.trackIds, ...action.payload.result]),
        tracksFetching: false,
        tracksNextHref: action.payload.nextHref,
      };
    case USER_PROFILE_TRACKS_FAILED:
      return {
        ...state,
        tracksFetching: false,
      };
    default:
      return state;
  }
}

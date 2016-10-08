import { fromJS } from 'immutable';
import {
  START_SEARCH,
  END_SEARCH,
  SEARCH_USERS_RECEIVED,
  SEARCH_TRACKS_RECEIVED,
  HIDE_SEARCH_RESULTS,
  SHOW_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS
} from 'client/constants/ActionTypes';

const INITIAL_STATE = fromJS({
  showResults: false,
  isFetching: false,
  usersById: {},
  userIds: [],
  userNextHref: null,
  tracksById: {},
  trackIds: [],
  trackNextHref: null
});

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_SEARCH:
      return state.set('isFetching', true);
    case END_SEARCH:
      return state.set('isFetching', false);
    case SEARCH_USERS_RECEIVED:
      // Set payload(users) to users
      return state.merge(fromJS(action.payload));
    case SEARCH_TRACKS_RECEIVED:
      return state.merge(fromJS(action.payload));
    case HIDE_SEARCH_RESULTS:
      return state.set('showResults', false);
    case SHOW_SEARCH_RESULTS:
      return state.set('showResults', true);
    case CLEAR_SEARCH_RESULTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
export default search;

/* Selectors */
const getUsersMap = state => state.get('usersById').toJS();
const getUserIds = state => state.get('userIds').toJS();

const getTracksMap = state => state.get('tracksById').toJS();
const getTrackIds = state => state.get('trackIds').toJS();

export const getTracksAsArray = (state) => {
  const trackIds = getTrackIds(state);
  const tracksById = getTracksMap(state);
  if (trackIds && tracksById) return trackIds.map(trackId => tracksById[trackId]);
  return [];
};

export const getUsersAsArray = (state) => {
  const userIds = getUserIds(state);
  const usersById = getUsersMap(state);
  if (userIds && usersById) return userIds.map(userId => usersById[userId]);
  return [];
};
export const getTrackNextHref = state => state.get('trackNextHref');

export const getUserNextHref = state => state.get('userNextHref');
export const getIsFetching = state => state.get('isFetching');
export const getShowResults = state => state.get('showResults');

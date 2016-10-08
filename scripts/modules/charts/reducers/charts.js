import { fromJS } from 'immutable';
// import { DEFAULT_GENRE } from 'client/constants/SongConstants';
import {
  CHARTS_REQUEST_TRACKS,
  CHARTS_RECEIVE_TRACKS,
  CHARTS_CHANGE_GENRE
} from 'client/constants/ActionTypes';

const INITIAL_STATE = fromJS({
  genre: '',
  tracksById: {},
  trackIds: [],
  isFetching: false
});

const charts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHARTS_CHANGE_GENRE:
      return state.set('genre', fromJS(action.payload));
    case CHARTS_REQUEST_TRACKS:
      return state.set('isFetching', true);

    case CHARTS_RECEIVE_TRACKS:
    // This wont work well with scroll to load more.
      return state.merge(fromJS({
        isFetching: false,
        tracksById: action.payload.tracksById,
        trackIds: action.payload.trackIds
      }));
    default:
      return state;
  }
};

export default charts;

export const getGenre = state => state.get('genre');

export const getTracksMap = state => state.get('tracksById').toJS();
export const getTrackIds = state => state.get('trackIds').toJS();

export const getTracksAsArray = (state) => {
  const tracksById = getTracksMap(state);
  const trackIds = getTrackIds(state);
  return trackIds.map(id => tracksById[id]);
};

export const getIsFetching = state => state.get('isFetching');

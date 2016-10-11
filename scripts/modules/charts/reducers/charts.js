import { fromJS } from 'immutable';
import {
  CHARTS_REQUEST_TRACKS,
  CHARTS_RECEIVE_TRACKS,
  CHARTS_CHANGE_GENRE
} from 'client/constants/ActionTypes';

import TrackMap from 'client/models/TrackMap';

const INITIAL_STATE = fromJS({
  genre: '',
  trackMap: new TrackMap(),
  isFetching: false,
  nextHref: ''
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
        nextHref: action.payload.nextHref
      }))
      .set('trackMap', action.payload.trackMap);
    default:
      return state;
  }
};

export default charts;

export const getGenre = state => state.get('genre');

export const getTrackMap = state => state.get('trackMap');

export const getIsFetching = state => state.get('isFetching');

import { fromJS } from 'immutable';
import {
  CHARTS_CHANGE_GENRE,
  CHARTS_REQUEST,
  CHARTS_RECEIVE,
  // CHARTS_FAILURE,
} from 'client/constants/ActionTypes';
import TrackMap from 'client/models/TrackMap';
import { denormalizeTracks } from 'client/models/denormalizr';

const INITIAL_STATE = fromJS({
  genre: '',
  tracks: new TrackMap(),
  isFetching: false,
  nextHref: ''
});

const charts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHARTS_CHANGE_GENRE:
      return state.set('genre', fromJS(action.payload));
    case CHARTS_REQUEST:
      return state.set('isFetching', true);

    case CHARTS_RECEIVE:
      return state.merge({
        tracks: denormalizeTracks(action.payload),
        nextHref: action.payload.nextHref,
        isFetching: false
      });
    default:
      return state;
  }
};

export default charts;

export const getGenre = state => state.get('genre');
export const getTrackMap = state => state.get('tracks');
export const getIsFetching = state => state.get('isFetching');

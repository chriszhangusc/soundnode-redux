import { fromJS } from 'immutable';
import {
  CHARTS_CHANGE_GENRE,
  CHARTS_REQUEST,
  CHARTS_RECEIVE,
  CHARTS_FAILURE,
} from 'client/constants/ActionTypes';
import { denormalizeTracks } from 'client/utils/NormalizeUtils';
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
    case CHARTS_REQUEST:
      return state.set('isFetching', true);

    case CHARTS_RECEIVE:
      return state.merge({
        trackMap: denormalizeTracks(action.payload),
        nextHref: action.payload.nextHref,
        isFetching: false
      });
    default:
      return state;
  }
};

export default charts;

export const getGenre = state => state.get('genre');
export const getTrackMap = state => state.get('trackMap');
export const getIsFetching = state => state.get('isFetching');

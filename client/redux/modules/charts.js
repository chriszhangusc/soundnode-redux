import { fromJS } from 'immutable';
import {
  CHARTS_CHANGE_GENRE,
  CHARTS_REQUEST,
  CHARTS_RECEIVE,
  CHARTS_FAILURE,
} from 'client/constants/ActionTypes';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { formatGenre } from 'client/utils/FormatUtils';
import { trackArraySchema } from 'client/schemas';
import TrackMap from 'client/models/TrackMap';
import { denormalizeTracks } from 'client/models/denormalizr';

/* Action */
const changeGenre = genre => ({
  type: CHARTS_CHANGE_GENRE,
  payload: genre
});

// http://localhost:3001/sc/api-v2/charts
// ?kind=top&genre=soundcloud:genres:country
// &limit=20&offset=0&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
export const fetchCharts = genre => ({
  [CALL_API]: {
    endpoint: '/sc/api-v2/charts',
    query: {
      kind: 'top',
      genre: `soundcloud:genres:${genre}`,
      offset: 0,
      limit: 50
    },
    method: 'GET',
    types: [CHARTS_REQUEST, CHARTS_RECEIVE, CHARTS_FAILURE],
    schema: trackArraySchema
  }
});

/* Thunks */
export const loadCharts = genre => (dispatch) => {
  const formattedGenre = formatGenre(genre);
  dispatch(changeGenre(genre));
  dispatch(fetchCharts(formattedGenre));
};


/* Reducer */
const INITIAL_STATE = fromJS({
  genre: '',
  tracks: new TrackMap(),
  trackIds: [], // Array of Strings!!!
  fetching: false,
  nextHref: ''
});

const charts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHARTS_CHANGE_GENRE:
      return state.set('genre', fromJS(action.payload));
    case CHARTS_REQUEST:
      return state.set('fetching', true);

    case CHARTS_RECEIVE:
      return state.merge({
        tracks: denormalizeTracks(action.payload),
        trackIds: state.get('trackIds').concat(action.payload.result.map(String)),
        nextHref: action.payload.nextHref,
        fetching: false
      });
    default:
      return state;
  }
};

export default charts;
export const getGenre = state => state.get('genre');
export const getTrackMap = state => state.get('tracks');
export const isFetching = state => state.get('fetching');
export const getTrackIds = state => state.get('trackIds'); // As Immutable.List

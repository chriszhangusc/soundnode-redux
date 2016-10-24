import { fromJS } from 'immutable';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { formatGenre } from 'client/utils/FormatUtils';
import { trackArraySchema } from 'client/schemas';

const CLEAR_ALL_CHARTS = 'CLEAR_ALL_CHARTS';
export const CHANGE_GENRE = 'redux-music/charts/CHANGE_GENRE';
export const REQUEST = 'redux-music/charts/REQUEST';
export const RECEIVED = 'redux-music/charts/RECEIVE';
export const FAILURE = 'redux-music/charts/FAILURE';

/* Action */
const changeGenre = genre => ({
  type: CHANGE_GENRE,
  payload: genre
});

// http://localhost:3001/sc/api-v2/charts
// ?kind=top&genre=soundcloud:genres:country
// &limit=20&offset=0&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
export const fetchCharts = genre => ({
  [CALL_API]: {
    endpoint: '/sc/api-v2/charts',
    fetchOptions: {
      method: 'GET'
    },
    query: {
      kind: 'top',
      genre: `soundcloud:genres:${genre}`,
      offset: 0,
      limit: 50
    },
    types: [REQUEST, RECEIVED, FAILURE],
    schema: trackArraySchema
  }
});

export const clearAllCharts = () => ({
  type: CLEAR_ALL_CHARTS
});

/* Thunks */
// This is only called from onEnter of charts page.
export const loadCharts = genre => (dispatch) => {
  const formattedGenre = formatGenre(genre);
  dispatch(changeGenre(genre));
  // Clear all charts
  dispatch(clearAllCharts());
  dispatch(fetchCharts(formattedGenre));
};


/* Reducer */
const INITIAL_STATE = fromJS({
  genre: '',
  trackIds: [], // Array of Strings!!!
  fetching: false,
  nextHref: ''
});

const charts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_GENRE:
      return state.set('genre', fromJS(action.payload));
    case REQUEST:
      return state.set('fetching', true);
    case RECEIVED:
      return state.merge({
        trackIds: state.get('trackIds').concat(fromJS(action.payload.result.map(String))),
        nextHref: action.payload.nextHref,
        fetching: false
      });
    case CLEAR_ALL_CHARTS:
      return state.set('trackIds', fromJS([]));
    default:
      return state;
  }
};

export default charts;
export const getGenre = state => state.get('genre');
export const getTrackMap = state => state.get('tracks');
export const isFetching = state => state.get('fetching');
export const getTrackIds = state => state.get('trackIds'); // As Immutable.List

import { fromJS } from 'immutable';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { formatGenre } from 'client/utils/FormatUtils';
import { trackArraySchema } from 'client/schemas';

/* Constants */
export const GENRES = [
  'All-Music',
  'Ambient',
  'Country',
  'Dance & EDM',
  'Deep House',
  'Disco',
  'Hip-hop & Rap',
  'Metal',
  'Pop',
  'R&B & Soul'
];
export const DEFAULT_GENRE = 'All-Music';
export const CHANGE_GENRE = 'redux-music/charts/CHANGE_GENRE';
export const CHARTS_REQUEST = 'redux-music/charts/CHARTS_REQUEST';
export const CHARTS_RECEIVED = 'redux-music/charts/CHARTS_RECEIVED';
export const CHARTS_FAILURE = 'redux-music/charts/CHARTS_FAILURE';
const CLEAR_ALL_CHARTS = 'redux-music/charts/CLEAR_ALL_CHARTS';
const TOP_COUNT = 50;
const LIMIT = 25;

/* Reducer */
const INITIAL_STATE = fromJS({
  genre: '',
  trackIds: [], // Array of Strings!!!
  fetching: false,
  offset: 0
  // nextHref: ''
});

const charts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_GENRE:
      return state.merge(fromJS({
        genre: action.payload,
        offset: 0
      }));
    case CHARTS_REQUEST:
      return state.set('fetching', true);
    case CHARTS_RECEIVED:
      return state.merge({
        trackIds: state.get('trackIds').concat(fromJS(action.payload.result.map(String))).slice(0, TOP_COUNT),
        offset: state.get('offset') + LIMIT,
        fetching: false
      });
    case CLEAR_ALL_CHARTS:
      return state.set('trackIds', fromJS([]));
    default:
      return state;
  }
};

export default charts;

/* Selectors */
export const getChartsGenre = state => state.get('charts').get('genre');
export const getChartsTrackIds = state => state.get('charts').get('trackIds');
export const isChartsFetching = state => state.get('charts').get('fetching');
export const getChartsOffset = state => state.get('charts').get('offset');

/* Actions */
const changeGenre = genre => ({
  type: CHANGE_GENRE,
  payload: genre
});

// http://localhost:3001/sc/api-v2/charts?genre=country&limit=20&offset=0&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
// fetchCharts according to current limit
export const fetchCharts = genre => (dispatch, getState) => {
  const state = getState();
  const offset = getChartsOffset(state);
  dispatch({
    [CALL_API]: {
      endpoint: '/sc/api-v2/charts',
      fetchOptions: {
        method: 'GET'
      },
      query: {
        genre,
        offset,
        limit: LIMIT
      },
      types: [CHARTS_REQUEST, CHARTS_RECEIVED, CHARTS_FAILURE],
      schema: trackArraySchema
    }
  });
};


export const clearAllCharts = () => ({
  type: CLEAR_ALL_CHARTS
});

/* Thunks */
// This is only called from onEnter of charts page.
export const loadCharts = genre => (dispatch) => {
  const formattedGenre = formatGenre(genre);
  // console.log(formattedGenre, genre);
  // v2.fetchCharts(formattedGenre).then(tracks => {
  //   console.log(tracks);
  // });
  dispatch(changeGenre(genre));
  // Clear all charts
  dispatch(clearAllCharts());
  dispatch(fetchCharts(formattedGenre));
};

export const loadMoreCharts = () => (dispatch, getState) => {
  const state = getState();
  const chartsFetching = isChartsFetching(state);
  const size = getChartsTrackIds(state).size;
  if (!chartsFetching && size < TOP_COUNT) {
    const genre = getChartsGenre(state);
    const formattedGenre = formatGenre(genre);
    dispatch(fetchCharts(formattedGenre));
  }
};

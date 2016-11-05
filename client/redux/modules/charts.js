import { fromJS } from 'immutable';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { formatGenre } from 'client/utils/FormatUtils';
import { trackArraySchema } from 'client/schemas';
import { TOP_COUNT, LIMIT } from 'client/constants/ChartsConsts';
/* Constants */
export const DEFAULT_GENRE = 'All-Music';
export const CHANGE_GENRE = 'redux-music/charts/CHANGE_GENRE';
export const CHARTS_REQUEST = 'redux-music/charts/CHARTS_REQUEST';
export const CHARTS_RECEIVED = 'redux-music/charts/CHARTS_RECEIVED';
export const CHARTS_FAILURE = 'redux-music/charts/CHARTS_FAILURE';
export const CLEAR_ALL_CHARTS = 'redux-music/charts/CLEAR_ALL_CHARTS';


/* Reducer */
const initialState = fromJS({
  genre: '',
  trackIds: [],
  fetching: false,
  offset: 0,
});

export default function chartsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_GENRE:
      return state.merge(fromJS({
        genre: action.payload,
        offset: 0,
      }));
    case CHARTS_REQUEST:
      return state.set('fetching', true);
    case CHARTS_RECEIVED:
      return state.merge({
        trackIds: state.get('trackIds').concat(fromJS(action.payload.result)).slice(0, TOP_COUNT),
        offset: state.get('offset') + LIMIT,
        fetching: false,
      });
    case CLEAR_ALL_CHARTS:
      return state.set('trackIds', fromJS([]));
    default:
      return state;
  }
}

/* Selectors */
export const getChartsGenre = state => state.get('charts').get('genre');
export const getChartsTrackIds = state => state.get('charts').get('trackIds');
export const isChartsFetching = state => state.get('charts').get('fetching');
export const getChartsOffset = state => state.get('charts').get('offset');

/* Actions */
export const changeGenre = genre => ({
  type: CHANGE_GENRE,
  payload: genre,
});

export const clearAllCharts = () => ({
  type: CLEAR_ALL_CHARTS,
});

// http://localhost:3001/sc/api-v2/charts?genre=country&limit=20&offset=0&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
// fetchCharts according to current limit
export function fetchCharts(genre) {
  return (dispatch, getState) => {
    const state = getState();
    const offset = getChartsOffset(state);
    dispatch({
      [CALL_API]: {
        endpoint: '/sc/api-v2/charts',
        fetchOptions: {
          method: 'GET',
        },
        query: {
          genre,
          offset,
          limit: LIMIT,
        },
        types: [CHARTS_REQUEST, CHARTS_RECEIVED, CHARTS_FAILURE],
        schema: trackArraySchema,
      },
    });
  };
}

export function loadCharts(genre) {
  return (dispatch) => {
    const formattedGenre = formatGenre(genre);
    dispatch(changeGenre(genre));
    dispatch(clearAllCharts());
    dispatch(fetchCharts(formattedGenre));
  };
}

export function loadMoreCharts() {
  return (dispatch, getState) => {
    const state = getState();
    const chartsFetching = isChartsFetching(state);
    const size = getChartsTrackIds(state).size;
    if (!chartsFetching && size < TOP_COUNT) {
      const genre = getChartsGenre(state);
      const formattedGenre = formatGenre(genre);
      dispatch(fetchCharts(formattedGenre));
    }
  };
}

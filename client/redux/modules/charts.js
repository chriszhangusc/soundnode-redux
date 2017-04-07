// Charts duck file
// import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { formatGenre } from 'client/utils/FormatUtils';
// import { trackArraySchema } from 'client/schemas';
import { TOP_COUNT, LIMIT } from 'client/constants/ChartsConsts';
import { fetchChartsFromSC } from 'client/api/sc/v2';
import { notificationFailure } from 'client/redux/modules/notification';
/* Action Constants */
// Naming convention: NOUN_VERB
export const CHARTS_GENRE_CHANGE = 'redux-music/charts/CHARTS_GENRE_CHANGE';
export const CHARTS_REQUEST = 'redux-music/charts/CHARTS_REQUEST';
export const CHARTS_RECEIVED = 'redux-music/charts/CHARTS_RECEIVED';
// export const CHARTS_FAILED = 'redux-music/charts/CHARTS_FAILED';
export const CHARTS_CLEAR = 'redux-music/charts/CHARTS_CLEAR';
export const CHARTS_SPINNER_STOP = 'redux-music/charts/CHARTS_SPINNER_STOP';

/* Reducer */
const initialState = {
  genre: '',
  // Visible tracks in current charts page.
  trackIds: [],
  fetching: false,
  fetchOffset: 0,
};

// #TODO: Should we extract fetchOffset?
export default function chartsReducer(state = initialState, action) {
  switch (action.type) {
    case CHARTS_GENRE_CHANGE:
      return {
        ...state,
        genre: action.payload,
        fetchOffset: 0,
      };
    case CHARTS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case CHARTS_RECEIVED:
      return {
        ...state,
        trackIds: [...state.trackIds, ...action.payload.result].slice(0, TOP_COUNT),
        fetchOffset: state.fetchOffset + LIMIT,
        // fetching: false,
      };
    // case CHARTS_FAILED:     return state.set('fetching', false);
    case CHARTS_CLEAR:
      return {
        ...state,
        trackIds: [],
      };
    case CHARTS_SPINNER_STOP:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
}

/* Selectors */
const getChartsState = state => state.charts;
export const getChartsGenre = state => getChartsState(state).genre;
export const getChartsTrackIds = state => getChartsState(state).trackIds;
export const isChartsFetching = state => getChartsState(state).fetching;
export const getChartsFetchOffset = state => getChartsState(state).fetchOffset;

/* Action Creators */

// Naming convention: VERB_NOUN
export const changeGenre = genre => ({ type: CHARTS_GENRE_CHANGE, payload: genre });

export const clearAllCharts = () => ({ type: CHARTS_CLEAR });

const requestCharts = () => ({ type: CHARTS_REQUEST });

const receiveCharts = (normalizedCharts, playlistName) => ({
  type: CHARTS_RECEIVED,
  playlistName,
  payload: normalizedCharts,
  entities: normalizedCharts.entities,
});

const stopSpinner = () => ({ type: CHARTS_SPINNER_STOP });

/* Side Effects */

// http://localhost:3001/sc/api-v2/charts?genre=country&limit=20&offset=0&client
// _id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
export function fetchChartsAndUpdatePlaylist(genre) {
  return async (dispatch, getState) => {
    const state = getState();
    const offset = getChartsFetchOffset(state);
    dispatch(requestCharts());
    try {
      const normalizedCharts = await fetchChartsFromSC(genre, offset);
      // #TODO: Verify results!!
      dispatch(receiveCharts(normalizedCharts, genre));
    } catch (err) {
      console.log('error: ', err);
      dispatch(notificationFailure('Something is wrong!'));
    } finally {
      // Stop loading spinner
      dispatch(stopSpinner());
    }
  };
}

export function loadChartsPage(genre) {
  return (dispatch) => {
    const formattedGenre = formatGenre(genre);
    // Remove all old search results because we do not want them to interfere the new ones.
    dispatch(clearAllCharts());

    dispatch(fetchChartsAndUpdatePlaylist(formattedGenre));
  };
}

export function loadMoreCharts() {
  return (dispatch, getState) => {
    const state = getState();
    const chartsFetching = isChartsFetching(state);
    // Limit the number of fetched results.
    const size = getChartsTrackIds(state).length;
    if (!chartsFetching && size < TOP_COUNT) {
      const genre = getChartsGenre(state);
      const formattedGenre = formatGenre(genre);
      dispatch(fetchChartsAndUpdatePlaylist(formattedGenre));
    }
  };
}

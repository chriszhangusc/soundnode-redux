// Charts duck file
import { fromJS } from 'immutable';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { formatGenre } from 'client/utils/FormatUtils';
import { trackArraySchema } from 'client/schemas';
import { TOP_COUNT, LIMIT } from 'client/constants/ChartsConsts';
import { fetchChartsFromSC } from 'client/api/sc/v2';
import { notificationFailure } from 'client/redux/modules/notification';

/* Constants */
// Naming convention: NOUN_VERB
export const DEFAULT_GENRE = 'all-music';
export const CHARTS_GENRE_CHANGE = 'redux-music/charts/CHARTS_GENRE_CHANGE';
export const CHARTS_REQUEST = 'redux-music/charts/CHARTS_REQUEST';
export const CHARTS_RECEIVED = 'redux-music/charts/CHARTS_RECEIVED';
// export const CHARTS_FAILED = 'redux-music/charts/CHARTS_FAILED';
export const CHARTS_CLEAR = 'redux-music/charts/CHARTS_CLEAR';
export const CHARTS_SPINNER_STOP = 'redux-music/charts/CHARTS_SPINNER_STOP';

/* Reducer */
const initialState = fromJS({
  genre: '',
  trackIds: [],
  fetching: false,
  offset: 0,
});

export default function chartsReducer(state = initialState, action) {
    switch (action.type) {
        case CHARTS_GENRE_CHANGE:
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
                // fetching: false,
            });
        // case CHARTS_FAILED:
        //     return state.set('fetching', false);
        case CHARTS_CLEAR:
            return state.set('trackIds', fromJS([]));
        case CHARTS_SPINNER_STOP:
            return state.set('fetching', false);
        default:
            return state;
    }
}

/* Selectors */
export const getChartsGenre = state => state.get('charts').get('genre');
export const getChartsTrackIds = state => state.get('charts').get('trackIds');
export const isChartsFetching = state => state.get('charts').get('fetching');
export const getChartsOffset = state => state.get('charts').get('offset');

/* Action Creators */

// Naming convention: VERB_NOUN
export const changeGenre = genre => ({
  type: CHARTS_GENRE_CHANGE,
  payload: genre,
});

export const clearAllCharts = () => ({
  type: CHARTS_CLEAR,
});

const requestCharts = () => ({
    type: CHARTS_REQUEST
})

const receiveCharts = (normalizedCharts) => ({
    type: CHARTS_RECEIVED,
    payload: normalizedCharts,
    entities: normalizedCharts.entities,
});

const stopSpinner = () => ({
    type: CHARTS_SPINNER_STOP
});

/* Side Effects */

// http://localhost:3001/sc/api-v2/charts?genre=country&limit=20&offset=0&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
export function fetchCharts(genre) {
    return async (dispatch, getState) => {
        const state = getState();
        const offset = getChartsOffset(state);
        dispatch(requestCharts());
        try {
            const normalizedCharts = await fetchChartsFromSC(genre);
            // #TODO: Verify results!!
            dispatch(receiveCharts(normalizedCharts));
        } catch (err) {
            console.log('error: ', err);
            dispatch(notificationFailure(err.message));
        } finally {
            // Stop loading spinner
            dispatch(stopSpinner());
        }
    };
}

export function loadCharts(genre) {
    return (dispatch) => {
        dispatch(changeGenre(genre));
        const formattedGenre = formatGenre(genre);
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

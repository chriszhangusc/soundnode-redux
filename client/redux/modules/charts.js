import { fromJS } from 'immutable';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { formatGenre } from 'client/utils/FormatUtils';
import { trackArraySchema } from 'client/schemas';

/* Constants */

// #FIXME: Move it to a seperate const file
export const GENRES = [
  {
    link: 'all-music',
    title: 'All',
  },
  {
    link: 'alternativerock',
    title: 'Alternative Rock',
  },
  {
    link: 'ambient',
    title: 'Ambient',
  },
  {
    link: 'classical',
    title: 'Classical',
  },
  {
    link: 'country',
    title: 'Country',
  },
  {
    link: 'danceedm',
    title: 'Dance & EDM',
  },
  {
    link: 'dancehall',
    title: 'Dancehall',
  },
  {
    link: 'deephouse',
    title: 'Deep House',
  },
  {
    link: 'disco',
    title: 'Disco',
  },
  {
    link: 'drumbass',
    title: 'Drum & Bass',
  },
  {
    link: 'dubstep',
    title: 'Dubstep',
  },
  {
    link: 'electronic',
    title: 'Electronic',
  },
  {
    link: 'folksingersongwriter',
    title: 'Folk & Singer-Songwriter',
  },
  {
    link: 'hiphoprap',
    title: 'Hip-hop & Rap',
  },
  {
    link: 'house',
    title: 'House',
  },
  {
    link: 'indie',
    title: 'Indie',
  },
  {
    link: 'jazzblues',
    title: 'Jazz & Blues',
  },
  {
    link: 'latin',
    title: 'Latin',
  },
  {
    link: 'metal',
    title: 'Metal',
  },
  {
    link: 'piano',
    title: 'Piano',
  },
  {
    link: 'pop',
    title: 'Pop',
  },
  {
    link: 'rbsoul',
    title: 'R&B & Soul',
  },
  {
    link: 'reggae',
    title: 'Reggae',
  },
  {
    link: 'reggaeton',
    title: 'Reggaeton',
  },
  {
    link: 'rock',
    title: 'Rock',
  },
  {
    link: 'soundtrack',
    title: 'Soundtrack',
  },
  {
    link: 'techno',
    title: 'Techno',
  },
  {
    link: 'trance',
    title: 'Trance',
  },
  {
    link: 'trap',
    title: 'Trap',
  },
  {
    link: 'triphop',
    title: 'Triphop',
  },
  {
    link: 'world',
    title: 'World',
  },
];

export const DEFAULT_GENRE = 'All-Music';
export const CHANGE_GENRE = 'redux-music/charts/CHANGE_GENRE';
export const CHARTS_REQUEST = 'redux-music/charts/CHARTS_REQUEST';
export const CHARTS_RECEIVED = 'redux-music/charts/CHARTS_RECEIVED';
export const CHARTS_FAILURE = 'redux-music/charts/CHARTS_FAILURE';
export const CLEAR_ALL_CHARTS = 'redux-music/charts/CLEAR_ALL_CHARTS';
const TOP_COUNT = 50;
const LIMIT = 25;

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

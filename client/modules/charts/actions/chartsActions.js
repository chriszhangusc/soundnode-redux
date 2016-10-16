import {
  CHARTS_CHANGE_GENRE,
  CHARTS_REQUEST,
  CHARTS_RECEIVE,
  CHARTS_FAILURE
} from 'client/constants/ActionTypes';
import { CALL_API } from 'client/middlewares/apiMiddleware';
import { formatGenre } from 'client/utils/FormatUtils';
import { trackArraySchema } from 'client/schemas';

const changeGenre = genre => ({
  type: CHARTS_CHANGE_GENRE,
  payload: genre
});

// http://localhost:3001/sc/api-v2/charts
// ?kind=top&genre=soundcloud:genres:country&limit=20&offset=0&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
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
export const loadCharts = (genre) => {
  return (dispatch) => {
    const formattedGenre = formatGenre(genre);
    dispatch(changeGenre(genre));
    dispatch(fetchCharts(formattedGenre));
  };
};

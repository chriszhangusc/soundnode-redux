import {
  ARTIST_REQUEST,
  ARTIST_RECEIVE,
  ARTIST_FAILURE,
  ARTIST_TRACKS_REQUEST,
  ARTIST_TRACKS_RECEIVE,
  ARTIST_TRACKS_FAILURE
} from 'client/constants/ActionTypes';

import { CALL_API } from 'client/middlewares/apiMiddleware';
import { artistSchema, trackArraySchema } from 'client/schemas';

export const fetchArtist = id => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/users/${id}`,
    method: 'GET',
    types: [ARTIST_REQUEST, ARTIST_RECEIVE, ARTIST_FAILURE],
    schema: artistSchema
  }
});

export const fetchArtistTracks = id => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/users/${id}/tracks`,
    query: {
      limit: 20
    },
    method: 'GET',
    types: [ARTIST_TRACKS_REQUEST, ARTIST_TRACKS_RECEIVE, ARTIST_TRACKS_FAILURE],
    schema: trackArraySchema
  }
});

export const fetchArtistAndTracks = id => (dispatch) => {
  dispatch(fetchArtist(id));
  dispatch(fetchArtistTracks(id));
};

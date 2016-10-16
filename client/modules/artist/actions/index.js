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
    endpoint: `https://api.soundcloud.com/users/${id}?client_id=f9e1e2232182a46705c880554a1011af`,
    method: 'GET',
    responseType: 'single',
    types: [ARTIST_REQUEST, ARTIST_RECEIVE, ARTIST_FAILURE],
    schema: artistSchema
  }
});

export const fetchArtistTracks = id => ({
  [CALL_API]: {
    endpoint: `https://api.soundcloud.com/users/${id}/tracks?linked_partitioning=1&limit=20&client_id=f9e1e2232182a46705c880554a1011af`,
    method: 'GET',
    responseType: 'collection',
    types: [ARTIST_TRACKS_REQUEST, ARTIST_TRACKS_RECEIVE, ARTIST_TRACKS_FAILURE],
    schema: trackArraySchema
  }
});

export const fetchArtistAndTracks = id => (dispatch) => {
  dispatch(fetchArtist(id));
  dispatch(fetchArtistTracks(id));
};

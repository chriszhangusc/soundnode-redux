import { CLIENT_ID } from '../../client/constants/Config';
import { normalizeResponse, constructFetchUrl, makeRequest } from './apiUtils';
import { artistSchema, trackSchema, commentArraySchema, trackArraySchema, artistArraySchema } from '../schemas';

const SC_API_V1 = 'https://api.soundcloud.com/';
const LIMIT = 20;
// filters = { q: 'abc' }
export function fetchTracks(filters, limit) {
  const endpoint = '/tracks/';
  const queryParams = {
    client_id: CLIENT_ID,
    linked_partitioning: 1,
    offset: 0,
    limit,
    ...filters,
  };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  return makeRequest(fetchUrl)
          .then(response => normalizeResponse(response, trackArraySchema));
}

export function fetchArtists(filters, limit) {
  const endpoint = '/users/';
  const queryParams = {
    client_id: CLIENT_ID,
    linked_partitioning: 1,
    offset: 0,
    limit,
    ...filters,
  };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  return makeRequest(fetchUrl)
          .then(response => normalizeResponse(response, artistArraySchema));
}

/**
 * Fetch a single track by id
 * @param  {number} id The id of the track we are fetching
 * @return {promise}    [The track object if fetch is success, undefined if not]
 */
export function fetchTrack(id) {
  const endpoint = `/tracks/${id}`;
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, { client_id: CLIENT_ID });
  return makeRequest(fetchUrl)
          .then(response => normalizeResponse(response, trackSchema));
}

export function fetchArtist(artistId) {
  const endpoint = `/users/${artistId}`;
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, { client_id: CLIENT_ID });
  return makeRequest(fetchUrl)
          .then(response => normalizeResponse(response, artistSchema));
}

export function fetchArtistTracks(artistId) {
  const endpoint = `/users/${artistId}/tracks`;
  const queryParams = {
    client_id: CLIENT_ID,
    limit: LIMIT,
    linked_partitioning: 1,
    offset: 0,
  };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  return makeRequest(fetchUrl)
          .then(response => normalizeResponse(response, trackArraySchema));
}

export function fetchMoreArtistTracks(nextHref) {
  return makeRequest(nextHref)
          .then(response => normalizeResponse(response, trackArraySchema));
}

// This is the initial fetch
export function fetchTrackComments(trackId) {
  const endpoint = `/tracks/${trackId}/comments`;
  const queryParams = {
    client_id: CLIENT_ID,
    limit: LIMIT,
    linked_partitioning: 1,
    offset: 0,
  };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  return makeRequest(fetchUrl)
          .then(response => normalizeResponse(response, commentArraySchema));
}

export function fetchMoreTrackComments(nextHref) {
  return makeRequest(nextHref)
          .then(response => normalizeResponse(response, commentArraySchema));
}

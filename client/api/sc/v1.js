import { CLIENT_ID } from 'client/constants/AuthConsts';
import { normalizeResponse, constructFetchUrl, makeRequest } from './apiUtils';
import { userSchema, trackSchema, commentArraySchema, trackArraySchema, userArraySchema } from '../schemas';

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
// console.log(fetchUrl);
  // return makeRequest(fetchUrl)
  //         .then(response => normalizeResponse(response, trackArraySchema));
  return makeRequest(fetchUrl, trackArraySchema);
}

export function fetchUsers(filters, limit) {
  const endpoint = '/users/';
  const queryParams = {
    client_id: CLIENT_ID,
    linked_partitioning: 1,
    offset: 0,
    limit,
    ...filters,
  };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  // return makeRequest(fetchUrl)
  //         .then(response => normalizeResponse(response, userArraySchema));
  return makeRequest(fetchUrl, userArraySchema);
}

/**
 * Fetch a single track by id
 * @param  {number} id The id of the track we are fetching
 * @return {promise}    [The track object if fetch is success, undefined if not]
 */
export function fetchTrack(id) {
  const endpoint = `/tracks/${id}`;
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, { client_id: CLIENT_ID });
  return makeRequest(fetchUrl, trackSchema);
          // .then(response => normalizeResponse(response, trackSchema));
}

export function fetchUser(userId) {
  const endpoint = `/users/${userId}`;
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, { client_id: CLIENT_ID });
  console.log(fetchUrl);
  return makeRequest(fetchUrl, userSchema);
          // .then(response => normalizeResponse(response, artistSchema));
}

export function fetchUserTracks(userId) {
  const endpoint = `/users/${userId}/tracks`;
  const queryParams = {
    client_id: CLIENT_ID,
    limit: LIMIT,
    linked_partitioning: 1,
    offset: 0,
  };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  // console.log(fetchUrl);
  return makeRequest(fetchUrl, trackArraySchema);
          // .then(response => normalizeResponse(response, trackArraySchema));
}

export function fetchMoreArtistTracks(nextHref) {
  return makeRequest(nextHref, trackArraySchema);
          // .then(response => normalizeResponse(response, trackArraySchema));
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

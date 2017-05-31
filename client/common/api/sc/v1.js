import { CLIENT_ID } from 'client/common/constants/authConsts';
import {
  userSchema,
  trackSchema,
  commentArraySchema,
  trackArraySchema,
  userArraySchema,
} from 'client/app/schema';

import { constructFetchUrl, makeRequestAndNormalize, makeRequest } from './apiUtils';

const SC_API_V1 = 'https://api.soundcloud.com/';
const LIMIT = 20;

export function fetchTracks(filters, limit = LIMIT) {
  const endpoint = '/tracks/';
  const queryParams = {
    client_id: CLIENT_ID,
    linked_partitioning: 1,
    offset: 0,
    limit,
    ...filters,
  };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  return makeRequestAndNormalize(fetchUrl, trackArraySchema);
}

export function fetchUsers(filters, limit = LIMIT) {
  const endpoint = '/users/';
  const queryParams = {
    client_id: CLIENT_ID,
    linked_partitioning: 1,
    offset: 0,
    limit,
    ...filters,
  };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  return makeRequestAndNormalize(fetchUrl, userArraySchema);
}

/**
 * Fetch a single track by id
 * @param  {number} id The id of the track we are fetching
 * @return {promise}    [The track object if fetch is success, undefined if not]
 */
export function fetchTrack(id) {
  const endpoint = `/tracks/${id}`;
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, { client_id: CLIENT_ID });
  return makeRequestAndNormalize(fetchUrl, trackSchema);
}

export function fetchUser(userId) {
  const endpoint = `/users/${userId}`;
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, { client_id: CLIENT_ID });
  // console.log(fetchUrl);
  return makeRequestAndNormalize(fetchUrl, userSchema);
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
  // console.log('Fetch user tracks:', fetchUrl);
  return makeRequestAndNormalize(fetchUrl, trackArraySchema);
}

export function fetchMoreUserTracks(nextHref) {
  return makeRequestAndNormalize(nextHref, trackArraySchema);
  // .then(response => normalizeResponse(response, trackArraySchema));
}

// http://api.soundcloud.com/users/250047142/favorites?linked_partitioning=1&limit=5000&oauth_token=1-136957-250047142-032114f80b26f
export function fetchFavoriteTrackIds(userId) {
  const endpoint = `/users/${userId}/favorites/ids`;
  const queryParams = {
    client_id: CLIENT_ID,
    limit: 5000, // ALL
    linked_partitioning: 1,
  };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  return fetch(fetchUrl).then(response => response.json()).then(result => result.collection);
}

// https://api.soundcloud.com/users/250047142/favorites/322834362?client_id=hV0x3cye6r1htAwy737V22PTsfd7HtOh&oauth_token=1-277537-250047142-4e12bb6dd78bc
export function likeTrack(userId, trackId) {
  const endpoint = `/users/${userId}/favorites/${trackId}`;
  const queryParams = { client_id: CLIENT_ID };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  return fetch(fetchUrl, { method: 'PUT' });
}

// DELETE https://api.soundcloud.com/users/250047142/favorites/322834362?client_id=hV0x3cye6r1htAwy737V22PTsfd7HtOh&oauth_token=1-277537-250047142-4e12bb6dd78bc
export function dislikeTrack(userId, trackId) {
  const endpoint = `/users/${userId}/favorites/${trackId}`;
  const queryParams = { client_id: CLIENT_ID };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  return fetch(fetchUrl, { method: 'DELETE' });
}

// https://api.soundcloud.com/tracks/257659076/comments/?linked_partitioning=1&offset=0&limit=50&client_id=f9e1e2232182a46705c880554a1011af
export function fetchComments(trackId, nextHref) {
  const endpoint = `/tracks/${trackId}/comments`;
  let fetchUrl = null;
  if (!nextHref) {
    const queryParams = { client_id: CLIENT_ID, linked_partitioning: 1, offset: 0, limit: 20 };
    fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  } else {
    fetchUrl = nextHref;
  }

  // console.log(fetchUrl);
  return makeRequestAndNormalize(fetchUrl, commentArraySchema);
}

export function fetchMeByToken(token) {
  const endpoint = '/me';
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, { oauth_token: token });
  console.log(fetchUrl);
  return fetch(fetchUrl);
}

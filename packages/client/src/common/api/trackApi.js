import SC from 'soundcloud';
import { camelizeKeys } from 'humps';
import { SC_API_V2 } from '@soundnode-redux/client/src/common/constants/apiConsts';
import { makeRequest } from '@soundnode-redux/client/src/common/utils/apiUtils';

export function fetchCharts(genre, limit = 25) {
  const requestUrl = `${SC_API_V2}/charts?kind=top&genre=soundcloud:genres:${genre}&linked_partitioning=1&limit=${limit}&offset=0`;
  return makeRequest(requestUrl);
}

export function searchTracks(query, limit = 20) {
  return SC.get('/tracks', {
    q: query,
    limit,
  }).then(json => camelizeKeys(json));
}

export function fetchTrackById(id) {
  return SC.get(`/tracks/${id}`).then(json => camelizeKeys(json));
}

export function fetchTracksByUserId(userId, limit) {
  return SC.get(`/users/${userId}/tracks`, {
    limit,
    linked_partitioning: 1,
  }).then(camelizeKeys);
}

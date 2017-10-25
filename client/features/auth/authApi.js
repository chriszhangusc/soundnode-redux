import { makeRequest, checkStatus, appendToken } from 'common/utils/apiUtils';
import { SC_API_V1 } from 'common/constants/apiConsts';

export function fetchMe() {
  return makeRequest(`${SC_API_V1}/me`);
}

export function likeTrack(trackId) {
  return makeRequest(`${SC_API_V1}/me/favorites/${trackId}`, { method: 'PUT' });
}

export function unlikeTrack(trackId) {
  return makeRequest(`${SC_API_V1}/me/favorites/${trackId}`, { method: 'DELETE' });
}

export function fetchMyFavoritesIds() {
  return makeRequest(`${SC_API_V1}/me/favorites/ids`);
}

// 'https://api.soundcloud.com/e1/me/track_reposts/ids?linked_partitioning=1&limit=200&oauth_token='
export function fetchMyRepostIds() {
  return makeRequest(`${SC_API_V1}/e1/me/track_reposts/ids`);
}

export function repost(trackId) {
  // Repost will get empty string as response, which will lead to json format error
  // when calling response.json()
  const fetchUrl = appendToken(`https://api.soundcloud.com/e1/me/track_reposts/${trackId}`);
  return fetch(fetchUrl, { method: 'PUT' }).then(checkStatus);
}

export function deleteRepost(trackId) {
  const fetchUrl = appendToken(`https://api.soundcloud.com/e1/me/track_reposts/${trackId}`);
  return fetch(fetchUrl, { method: 'DELETE' }).then(checkStatus);
}

import { SC_API_V1, SC_API_V2 } from 'common/constants/apiConsts';
import { makeRequest, requestPut, appendToken, requestDelete } from 'common/utils/apiUtils';

export function fetchMyFavorites(pageSize = 25) {
  const requestUrl = `${SC_API_V1}/me/favorites?linked_partitioning=1&limit=${pageSize}&offset=0`;
  return makeRequest(requestUrl);
}

// https://api-v2.soundcloud.com/stream/users/250047142?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z&limit=10&offset=0&linked_partitioning=1&app_version=1497015478
// The results will contain all the track and playlist reposts of the currently logged in user.
export function fetchMyStream(limit = 25) {
  const requestUrl = `${SC_API_V2}/stream?limit=${limit}&offset=0&linked_partitioning=1`;
  return makeRequest(requestUrl);
}

export function fetchMyPlaylists() {
  const requestUrl = `${SC_API_V1}/me/playlists?limit=10&format=json`;
  return makeRequest(requestUrl);
}

export function fetchMe() {
  return makeRequest(`${SC_API_V1}/me`);
}

export function likeTrack(trackId) {
  const url = appendToken(`${SC_API_V1}/me/favorites/${trackId}`);
  return requestPut(url);
}

export function unlikeTrack(trackId) {
  const url = appendToken(`${SC_API_V1}/me/favorites/${trackId}`);
  return requestDelete(url);
}

export function fetchMyFavoritesIds() {
  return makeRequest(`${SC_API_V1}/me/favorites/ids`);
}

// 'https://api.soundcloud.com/e1/me/track_reposts/ids?linked_partitioning=1&limit=200&oauth_token='
export function fetchMyRepostIds() {
  return makeRequest(`${SC_API_V1}/e1/me/track_reposts/ids`);
}

export function repost(trackId) {
  const url = appendToken(`${SC_API_V1}/e1/me/track_reposts/${trackId}`);
  return requestPut(url);
}

export function deleteRepost(trackId) {
  const url = appendToken(`${SC_API_V1}/e1/me/track_reposts/${trackId}`);
  return requestDelete(url);
}

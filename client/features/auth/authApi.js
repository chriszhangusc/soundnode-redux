import { makeSCV1Request, checkStatus, getSCApiUrl } from 'client/common/utils/apiUtils';

export function fetchMe() {
  return makeSCV1Request('/me');
}

export function likeTrack(trackId) {
  return makeSCV1Request(`/me/favorites/${trackId}`, { method: 'PUT' });
}

export function unlikeTrack(trackId) {
  return makeSCV1Request(`/me/favorites/${trackId}`, { method: 'DELETE' });
}

export function fetchMyFavoritesIds() {
  return makeSCV1Request('/me/favorites/ids');
}

// 'https://api.soundcloud.com/e1/me/track_reposts/ids?linked_partitioning=1&limit=200&oauth_token='
export function fetchMyRepostIds() {
  return makeSCV1Request('/e1/me/track_reposts/ids');
}

// #TODO: Modify make request method
export function repost(trackId) {
  // Repost will get empty string as response, which will lead to json format error
  // when calling response.json()
  const fetchUrl = getSCApiUrl(`https://api.soundcloud.com/e1/me/track_reposts/${trackId}`);
  return fetch(fetchUrl, { method: 'PUT' }).then(checkStatus);
}

export function deleteRepost(trackId) {
  const fetchUrl = getSCApiUrl(`https://api.soundcloud.com/e1/me/track_reposts/${trackId}`);
  return fetch(fetchUrl, { method: 'DELETE' }).then(checkStatus);
}

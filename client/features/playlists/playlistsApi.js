import { SC_API_V1, SC_API_V2 } from 'common/constants/apiConsts';
import { makeRequest } from 'common/utils/apiUtils';
import { normalizeResponse } from 'common/utils/normalizeUtils';
import { playlistArraySchema } from 'app/schema';

function transform(response) {
  return {
    ...response,
    collection: response.collection.map(item => item.track),
  };
}

export function fetchMyPlaylists() {
  const requestUrl = `${SC_API_V1}/me/playlists?limit=10&format=json`;
  return makeRequest(requestUrl).then(playlists =>
    normalizeResponse(playlists, playlistArraySchema),
  );
}

export function deleteSinglePlaylist(playlistId) {
  const requestUrl = `${SC_API_V1}/playlists/${playlistId}`;
  return makeRequest(requestUrl, { method: 'DELETE' });
}

export function fetchPlaylistByUserId(userId) {
  const requestUrl = `${SC_API_V2}/users/${userId}/playlists`;
  return makeRequest(requestUrl).then();
}

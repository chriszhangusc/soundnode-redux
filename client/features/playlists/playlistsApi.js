import { SC_API_V1 } from 'common/constants/apiConsts';
import { makeRequest, checkStatus } from 'common/utils/apiUtils';
import { normalizeResponse } from 'common/utils/normalizeUtils';
import { playlistArraySchema } from 'app/schema';

export function fetchMyPlaylists() {
  const requestUrl = `${SC_API_V1}/me/playlists?limit=10&format=json`;
  return makeRequest(requestUrl).then(playlists =>
    normalizeResponse(playlists, playlistArraySchema),
  );
}

export function deleteMyPlaylist(playlistId) {
  const requestUrl = `${SC_API_V1}/playlists/${playlistId}`;
  return fetch(requestUrl, { method: 'DELETE' }).then(checkStatus);
}

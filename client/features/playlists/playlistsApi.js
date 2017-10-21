import { SC_API_V1 } from 'common/constants/apiConsts';
import { makeRequest } from 'common/utils/apiUtils';
import { normalizeResponse } from 'common/utils/normalizeUtils';
import { playlistArraySchema } from 'app/schema';

export function fetchMyPlaylists() {
  const requestUrl = `${SC_API_V1}/me/playlists?limit=10&format=json`;
  return makeRequest(requestUrl).then(playlists =>
    normalizeResponse(playlists, playlistArraySchema),
  );
}

export function addTrackToPlaylist(trackId, userId = 250047142, playlistId = 357317107) {
  const requestUrl = `${SC_API_V1}/users/${userId}/playlists/${playlistId}`;
  // https://api.soundcloud.com/playlists/357317107.json?&oauth_token=1-283018-250047142-67772dd734f9f
  return makeRequest(requestUrl).then(response => {
    const putUrl = `${SC_API_V1}/playlists/${playlistId}.json`;
    makeRequest(putUrl, { method: 'PUT' });
  });
}

export function deleteSinglePlaylist(playlistId) {
  const requestUrl = `${SC_API_V1}/playlists/${playlistId}`;
  return makeRequest(requestUrl, { method: 'DELETE' });
}

// export function fetchPlaylistByUserId(userId) {
//   const requestUrl = `${SC_API_V2}/users/${userId}/playlists`;
//   return makeRequest(requestUrl).then(transform).then((playlists) => {
//     console.log(playlists);
//     return normalizeResponse(playlists, playlistArraySchema);
//   });
// }

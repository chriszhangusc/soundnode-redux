import { makeRequest } from 'common/utils/apiUtils';
import { normalizeResponse } from 'common/utils/normalizeUtils';
import { SC_API_V1 } from 'common/constants/apiConsts';
import { playlistArraySchema } from 'app/schema';

// function transform(response) {
//   return {
//     ...response,
//     collection: response.collection.map(item => item.track),
//   };
// }

// https://api.soundcloud.com/me/playlists?limit=10&format=json&oauth_token=1-283018-250047142-67772dd734f9f
export function fetchMyPlaylists() {
  const requestUrl = `${SC_API_V1}/me/playlists?format=json`;
  return makeRequest(requestUrl).then(response => normalizeResponse(response, playlistArraySchema));
}

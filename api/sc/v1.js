import { CLIENT_ID } from '../../client/constants/Config';
import { constructFetchUrl, makeRequest } from './utils';

const SC_API_V1 = 'https://api.soundcloud.com/';

/**
 * Fetch a single track by id
 * @param  {number} id The id of the track we are fetching
 * @return {promise}    [The track object if fetch is success, undefined if not]
 */
export function fetchTrack(id) {
  const endpoint = `/tracks/${id}`;
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, { client_id:CLIENT_ID });
  // Also fetch its artist!
  return makeRequest(fetchUrl);
};

export function fetchArtist(id) {
  const endpoint = `/users/${id}`;
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, { client_id:CLIENT_ID });
  console.log(fetchUrl);
  return makeRequest(fetchUrl);
};

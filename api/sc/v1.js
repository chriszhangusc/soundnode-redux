import { CLIENT_ID } from '../../client/constants/Config';
import { normalizeResponse, constructFetchUrl, makeRequest } from './apiUtils';
import { trackSchema, commentArraySchema } from '../schemas';

const SC_API_V1 = 'https://api.soundcloud.com/';
const COMMENT_LIMITS = 20;
/**
 * Fetch a single track by id
 * @param  {number} id The id of the track we are fetching
 * @return {promise}    [The track object if fetch is success, undefined if not]
 */
export function fetchTrack(id) {
  const endpoint = `/tracks/${id}`;
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, { client_id: CLIENT_ID });
  return makeRequest(fetchUrl)
          .then(response => normalizeResponse(response, trackSchema));
}

export function fetchArtist(id) {
  const endpoint = `/users/${id}`;
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, { client_id: CLIENT_ID });
  console.log(fetchUrl);
  return makeRequest(fetchUrl);
}
// This is the initial fetch
export function fetchTrackComments(trackId) {
  const endpoint = `/tracks/${trackId}/comments`;
  const queryParams = {
    client_id: CLIENT_ID,
    limit: COMMENT_LIMITS,
    linked_partitioning: 1,
    offset: 0,
  };
  const fetchUrl = constructFetchUrl(SC_API_V1, endpoint, queryParams);
  return makeRequest(fetchUrl)
          .then((response) => {
            return normalizeResponse(response, commentArraySchema);
          });
}

export function fetchMoreTrackComments(nextHref) {
  return makeRequest(nextHref)
          .then((response) => {
            return normalizeResponse(response, commentArraySchema);
          });
}

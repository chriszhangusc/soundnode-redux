import { makeRequest } from 'common/utils/apiUtils';
import { SC_API_V1 } from 'common/constants/apiConsts';
import { normalizeResponse } from 'common/utils/normalizeUtils';
import { trackArraySchema } from 'app/schema';

// https://api.soundcloud.com/tracks?q=despacito&limit=10&offset=0&linked_partitioning=1&oauth_token=1-136957-311973608-8e0402fa68641
export function fetchSearchResults(query, limit = 25) {
  const requestUrl = `${SC_API_V1}/tracks?q=${query}&limit=${limit}&offset=0&linked_partitioning=1`;
  return makeRequest(requestUrl).then(response => normalizeResponse(response, trackArraySchema));
}

export function fetchByNextHref(nextHref) {
  return makeRequest(nextHref).then(response => normalizeResponse(response, trackArraySchema));
}

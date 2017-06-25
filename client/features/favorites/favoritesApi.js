import { normalizeResponse } from 'common/utils/normalizeUtils';
import { trackArraySchema } from 'app/schema';
import { makeRequest } from 'common/utils/apiUtils';
import { SC_API_V1 } from 'common/constants/apiConsts';

export function fetchMyFavorites(pageSize = 25) {
  const requestUrl = `${SC_API_V1}/me/favorites?linked_partitioning=1&limit=${pageSize}&offset=0`;
  return makeRequest(requestUrl).then(tracks => normalizeResponse(tracks, trackArraySchema));
}

export function fetchFavoritesByNextHref(nextHref) {
  return makeRequest(nextHref).then(favorites => normalizeResponse(favorites, trackArraySchema));
}

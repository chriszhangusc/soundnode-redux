import { normalizeResponse } from 'client/common/utils/normalizeUtils';
import { trackArraySchema } from 'client/app/schema';
import { makeRequest, makeSCV1Request } from 'client/common/utils/apiUtils';

export function fetchMyFavorites(pageSize = 25) {
  return makeSCV1Request(
    `/me/favorites?linked_partitioning=1&limit=${pageSize}&offset=0`,
  ).then(tracks => normalizeResponse(tracks, trackArraySchema));
}

export function fetchFavoritesByNextHref(nextHref) {
  return makeRequest(nextHref).then(favorites => normalizeResponse(favorites, trackArraySchema));
}

import { camelizeKeys } from 'humps';
import SC from 'soundcloud';
import { normalize } from 'normalizr';
import { trackSchema, commentArraySchema } from 'client/app/schema';
import { normalizeResponse } from 'client/common/utils/normalizeUtils';
import { makeRequest } from 'client/common/utils/apiUtils';

export function fetchProfiledTrack(trackId) {
  return SC.get(`/tracks/${trackId}`)
    .then(track => camelizeKeys(track))
    .then(transformed => normalize(transformed, trackSchema));
}

export function fetchTrackComments(trackId, limit = 20) {
  return SC.get(`/tracks/${trackId}/comments`, {
    limit,
    linked_partitioning: 1,
  })
    .then(comments => camelizeKeys(comments))
    .then(transformed => normalizeResponse(transformed, commentArraySchema));
}

export function fetchMoreComments(nextHref) {
  return makeRequest(nextHref).then(response => normalizeResponse(response, commentArraySchema));
}

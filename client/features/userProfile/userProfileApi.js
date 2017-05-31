import { camelizeKeys } from 'humps';
import SC from 'soundcloud';
import { userSchema, trackArraySchema } from 'client/app/schema';
import { normalizeResponse } from 'client/common/utils/normalizeUtils';

export function fetchProfiledUser(userId) {
  return SC.get(`/users/${userId}`)
    .then(user => camelizeKeys(user))
    .then(transformed => normalizeResponse(transformed, userSchema));
}

export function fetchProfiledUserTracks(userId, limit = 20) {
  return SC.get(`/users/${userId}/tracks`, {
    limit,
    linked_partitioning: 1,
  })
    .then(tracks => camelizeKeys(tracks))
    .then(transformed => normalizeResponse(transformed, trackArraySchema));
}

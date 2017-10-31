import SC from 'soundcloud';
import { camelizeKeys } from 'humps';

export function fetchCommentsByTrackId(trackId, limit) {
  return SC.get(`/tracks/${trackId}/comments`, {
    limit,
    linked_partitioning: 1,
  }).then(camelizeKeys);
}

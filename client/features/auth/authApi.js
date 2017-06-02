import SC from 'soundcloud';
import { normalizeResponse } from 'client/common/utils/normalizeUtils';
import { trackArraySchema } from 'client/app/schema';

export function fetchMe() {
  return SC.get('/me');
}

export function fetchMyFacorites() {
  return SC.get('/me/favorites').then(tracks => normalizeResponse(tracks, trackArraySchema));
}

export function likeTrack(trackId) {
  return SC.put(`/me/favorites/${trackId}`);
}

export function unlikeTrack(trackId) {
  return SC.delete(`/me/favorites/${trackId}`);
}

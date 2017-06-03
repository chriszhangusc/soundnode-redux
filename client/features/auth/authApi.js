import { normalizeResponse } from 'client/common/utils/normalizeUtils';
import { trackArraySchema } from 'client/app/schema';
import { makeSCV1Request } from 'client/common/utils/apiUtils';

export function fetchMe() {
  return makeSCV1Request('/me');
}

export function fetchMyFacorites() {
  return makeSCV1Request('/me/favorites').then(tracks =>
    normalizeResponse(tracks, trackArraySchema),
  );
}

export function likeTrack(trackId) {
  return makeSCV1Request(`/me/favorites/${trackId}`, { method: 'PUT' });
}

export function unlikeTrack(trackId) {
  return makeSCV1Request(`/me/favorites/${trackId}`, { method: 'DELETE' });
}

import * as trackRepo from './repository';

export function getTrackById(trackId: number) {
  return trackRepo.getTrackById(trackId);
}

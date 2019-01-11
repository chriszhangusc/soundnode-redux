import * as trackRepo from './repository';

export async function getTrackById(trackId: number) {
  return trackRepo.getTrackById(trackId);
}

export async function getCharts(genre: string, offset: number, limit: number) {
  return trackRepo.getCharts(genre, offset, limit);
}

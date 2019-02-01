import * as commentRepo from './repository';

export function getCommentsByTrackId(trackId: number, offset: number, limit: number) {
  return commentRepo.getCommentsByTrackId(trackId, offset, limit);
}

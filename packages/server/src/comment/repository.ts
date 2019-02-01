import * as commentApiV1 from '../common/soundcloud/v1/comment';
import { getPaginatedResult } from '../common/helpers/repository';

export async function getCommentsByTrackId(trackId: number, offset: number, limit: number) {
  const result = await commentApiV1.getCommentsByTrackId(trackId, offset, limit);

  return getPaginatedResult(result);
}

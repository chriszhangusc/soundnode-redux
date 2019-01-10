import * as trackApi from '@soundnode-redux/server/src/common/soundcloud/v1/track';

export async function getTrackById(trackId: number) {
  return trackApi.getTrackById(trackId);
}

import url from 'url';
import * as trackApi from '@soundnode-redux/server/src/common/soundcloud/v1/track';
import * as trackApiV2 from '@soundnode-redux/server/src/common/soundcloud/v2/track';

export async function getTrackById(trackId: number) {
  return trackApi.getTrackById(trackId);
}

export async function getCharts(genre: string, offset: number, limit: number) {
  const { collection, nextHref } = await trackApiV2.getCharts(genre, offset, limit);

  let query;

  if (nextHref) {
    query = url.parse(nextHref, true).query;
  }

  return {
    charts: collection.map(({ track }) => track),
    hasNext: !!nextHref,
    offsetNext: query && Number(query.offset),
  };
}

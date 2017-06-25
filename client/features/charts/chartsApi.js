import { trackArraySchema } from 'app/schema';
import { makeRequest } from 'common/utils/apiUtils';
import { normalizeResponse } from 'common/utils/normalizeUtils';
import { SC_API_V2 } from 'common/constants/apiConsts';

// https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Aall-music&linked_partitioning=1&limit=25&offset=0&client_id=f9e1e2232182a46705c880554a1011af
function transform(response) {
  return {
    ...response,
    collection: response.collection.map(item => item.track),
  };
}

export function fetchCharts(genre, limit = 20) {
  const requestUrl = `${SC_API_V2}/charts?kind=top&genre=soundcloud:genres:${genre}&linked_partitioning=1&limit=${limit}&offset=0`;
  return (
    makeRequest(requestUrl)
      // transform collection: [{score, track}] to collection: [track]
      .then(transform)
      .then(transformed => normalizeResponse(transformed, trackArraySchema))
  );
}

export function fetchMoreCharts(nextHref) {
  return makeRequest(nextHref)
    .then(transform)
    .then(transformed => normalizeResponse(transformed, trackArraySchema));
}

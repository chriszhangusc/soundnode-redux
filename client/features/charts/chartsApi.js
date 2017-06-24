import { API_HOST } from 'common/constants/appConsts';
import { trackArraySchema } from 'app/schema';
import { makeRequest } from 'common/utils/apiUtils';
import { normalizeResponse } from 'common/utils/normalizeUtils';

// https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Aall-music&linked_partitioning=1&limit=25&offset=0&client_id=f9e1e2232182a46705c880554a1011af

function transform(response) {
  return {
    ...response,
    collection: response.collection.map(item => item.track),
  };
}

export function fetchCharts(genre, limit = 20) {
  // const fetchUrl = constructFetchUrl(baseUrl, endpoint, queryParams);
  const initialFetchUrl = `${API_HOST}/charts?kind=top&genre=soundcloud:genres:${genre}&linked_partitioning=1&limit=${limit}&offset=0`;
  return (
    makeRequest(initialFetchUrl)
      // transform collection: [{score, track}] to collection: [track]
      // .then(response => transform(response))
      .then(transform)
      .then(transformed => normalizeResponse(transformed, trackArraySchema))
  );
}

export function fetchMoreCharts(nextHref) {
  return makeRequest(nextHref)
    .then(transform)
    .then(transformed => normalizeResponse(transformed, trackArraySchema));
}

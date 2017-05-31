import { CLIENT_ID } from 'client/common/constants/authConsts';
import { API_HOST } from 'client/common/constants/appConsts';
import { trackArraySchema } from 'client/app/schema';
import { makeRequest } from 'client/common/utils/apiUtils';
import { normalizeResponse } from 'client/common/utils/normalizeUtils';

const SC_API_V2 = 'charts';

const baseUrl = `${API_HOST}${SC_API_V2}`;

// https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Aall-music&linked_partitioning=1&limit=25&offset=0&client_id=f9e1e2232182a46705c880554a1011af

function transform(response) {
  return {
    ...response,
    collection: response.collection.map(item => item.track),
  };
}

export function fetchCharts(genre, limit = 20) {
  // const fetchUrl = constructFetchUrl(baseUrl, endpoint, queryParams);
  const initialFetchUrl = `${API_HOST}/charts?kind=top&genre=soundcloud:genres:${genre}&linked_partitioning=1&limit=${limit}&offset=0&client_id=${CLIENT_ID}`;
  return (
    makeRequest(initialFetchUrl)
      // transform collection: [{score, track}] to collection: [track]
      // .then(response => transform(response))
      .then(response => ({
        ...response,
        collection: response.collection.map(item => item.track),
      }))
      .then(transformed => normalizeResponse(transformed, trackArraySchema))
  );
}

export function fetchMoreCharts(nextHref) {
  return makeRequest(nextHref)
    .then(response => transform(response))
    .then(transformed => normalizeResponse(transformed, trackArraySchema));
}

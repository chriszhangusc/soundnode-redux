import { CLIENT_ID } from 'client/common/constants/authConsts';
import { API_HOST } from 'client/common/constants/appConsts';
import { trackArraySchema } from 'client/app/schema';

import { constructFetchUrl, makeRequestAndNormalize } from './apiUtils';

const SC_API_V2 = '/sc/api-v2/';

const baseUrl = `${API_HOST}${SC_API_V2}`;

export function fetchCharts(genre, offset = 0, limit = 20) {
  const endpoint = 'charts';
  // Initial query params: should we extract it to a function or constant?
  const queryParams = {
    genre,
    limit,
    offset,
    // Should be automatically appended to every request url in the constructFetchUrl
    client_id: CLIENT_ID,
  };

  const fetchUrl = constructFetchUrl(baseUrl, endpoint, queryParams);
// console.log('fetchCharts:', fetchUrl);
  return makeRequestAndNormalize(fetchUrl, trackArraySchema);
}
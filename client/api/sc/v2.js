import { CLIENT_ID } from 'client/constants/AuthConsts';
import { API_HOST } from 'client/constants/AppConsts';

import { constructFetchUrl, makeRequest } from './api-utils';
import { trackArraySchema } from '../schemas';

const SC_API_V2 = '/sc/api-v2/';

const baseUrl = `${API_HOST}${SC_API_V2}`;

export function fetchChartsFromSC(genre, offset = 0, limit = 20) {
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
console.log('fetchCharts:', fetchUrl);
  return makeRequest(fetchUrl, trackArraySchema);
}


// Fetch user profile info
// https://api-v2.soundcloud.com/users/10494998/featured-profiles?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z
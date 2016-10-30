import { constructFetchUrl, makeRequest } from './apiUtils';

const SC_API_V2 = 'https://api-v2.soundcloud.com/';

// const config = {
//   baseUrl: 'https://api-v2.soundcloud.com/',
//   clientId: CLIENT_ID
// };

export function fetchCharts(genre, limit = 20, offset = 0, clientId) {
  const endpoint = 'charts';
  // Initial fetching queryParams
  const queryParams = {
    kind: 'top',
    genre: `soundcloud:genres:${genre}`,
    linked_partitioning: 1,
    limit,
    offset,
    client_id: clientId
  };

  const fetchUrl = constructFetchUrl(SC_API_V2, endpoint, queryParams);
  console.log('fetchCharts:', fetchUrl);
  return makeRequest(fetchUrl);
}

import { API_HOST, CLIENT_ID } from 'client/constants/Config';
import { constructFetchUrl, makeRequest } from './apiUtils';
import { trackArraySchema } from '../schemas';
const SC_API_V2 = '/sc/api-v2/';

const baseUrl = `${API_HOST}${SC_API_V2}`;

export function fetchChartsFromSC(genre, limit = 20, offset = 0) {
    const endpoint = 'charts';

    // Initial query params: should we extract it to a function or constant?
    const queryParams = {
        genre,
        limit,
        offset,
        // Should be automatically appended to every request url in the constructFetchUrl
        client_id: CLIENT_ID
    };

    const fetchUrl = constructFetchUrl(baseUrl, endpoint, queryParams);
console.log('fetchCharts:', fetchUrl);
    return makeRequest(fetchUrl, trackArraySchema);
}

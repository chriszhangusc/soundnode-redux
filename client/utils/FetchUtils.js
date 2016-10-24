import { CLIENT_ID } from 'client/constants/Config';
// import { trackArraySchema, artistArraySchema } from 'client/schemas';
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import fetch from 'isomorphic-fetch'; // Standard fetch is not yet supported by all browsers

const BASE_URL = new URL('http://localhost:3000');

export function constructFetchUrl(endpoint, queryParams) {
  let url = null;
  if (endpoint.indexOf('http://') === -1 && endpoint.indexOf('https://') === -1) {
    url = new URL(endpoint, BASE_URL);
  }
  const finalParams = {
    ...queryParams,
    client_id: CLIENT_ID
  };
  Object.keys(finalParams).forEach(key => url.searchParams.append(key, finalParams[key]));
console.log(String(url));
  return url.toString();
}

export async function fetchAndNormalize(endpoint, queryParams, normalizeSchema, fetchOptions) {
  const fetchUrl = constructFetchUrl(endpoint, queryParams);
  const response = await fetch(fetchUrl, fetchOptions);
  const json = await response.json();
  const camelizedJson = camelizeKeys(json);
  const { nextHref, collection } = camelizedJson;
  return Object.assign({}, normalize(collection, normalizeSchema), { nextHref });
}

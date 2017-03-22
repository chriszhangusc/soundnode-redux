import url from 'url';
import qs from 'querystring';
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';

// Return a promise
export function onResponseSuccess(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  // This actually returns a Promise!!
  return response.json();
}

// Construct fetch url with baseURL in current config, given endpoint and queryParams as an object
// baseUrl must end with '/', check how url.resolve works:
// https://nodejs.org/api/url.html#url_url_resolve_from_to
export function constructFetchUrl(baseUrl, endpoint, queryParams) {
  const finalUrl = url.resolve(baseUrl, endpoint);
  const queryStr = qs.stringify(queryParams); // queryStr will be "" if queryParams is undefined
  if (queryStr.length !== 0) {
    return `${finalUrl}?${queryStr}`;
  }
  return finalUrl;
}

// Simple wrapper of fetch
// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
// If normalizeSchema is specified, we normalize it using the given schema.
export function makeRequest(fetchUrl, normalizeSchema) {
  return fetch(fetchUrl)
          .then(onResponseSuccess)
          .then(json => camelizeKeys(json))
          .then(camelizedJson => normalizeResponse(camelizedJson, normalizeSchema))
          .catch(err => {
              console.log('Error while making ajax request!');
              console.log(err);
          });
}

// Normalize
export function normalizeResponse(jsonResponse, schema) {
    if (!schema) return jsonResponse;
    if (jsonResponse.collection) {
        const { nextHref, collection } = jsonResponse;
        return Object.assign({}, normalize(collection, schema), { nextHref });
    }
    return Object.assign({}, normalize(jsonResponse, schema));
}

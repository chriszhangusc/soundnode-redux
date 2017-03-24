import url from 'url';
import qs from 'querystring';
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';

/**
 * Response success handler
 * @param  {object} response - response object from fetch web api
 * @return {Promise}         - response json wrapped in Promise
 */
export function onResponseSuccess(response) {
    // response.ok is true if response status ranges from 200 to 299
    if (!response.ok) {
        // This will be wrapped in a reject promise!
        throw Error(response.statusText);
    }
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

// If normalizeSchema is specified, we normalize it using the given schema.
export function makeRequest(fetchUrl, normalizeSchema) {
    // fetch will only reject the promise when there is an internet error
    return fetch(fetchUrl)
        .catch(err => {
            // Let the user know when there is a connection error!
            throw Error('Can not make request, please check your internet connection!');
        })
        .then(onResponseSuccess)
        .then(json => camelizeKeys(json))
        .then(camelizedJson => normalizeResponse(camelizedJson, normalizeSchema));
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

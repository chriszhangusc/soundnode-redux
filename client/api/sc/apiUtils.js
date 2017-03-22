import url from 'url';
import qs from 'querystring';
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';


// function status(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return Promise.resolve(response)
//   } else {
//     return Promise.reject(new Error(response.statusText))
//   }
// }
//
// function json(response) {
//   return response.json()
// }
//
// fetch('users.json')
//   .then(status)
//   .then(json)
//   .then(function(data) {
//     console.log('Request succeeded with JSON response', data);
//   }).catch(function(error) {
//     console.log('Request failed', error);
//   });

// Return a promise
export function handleErrors(response) {
    // response.ok is true if response status ranges from 200 to 299
    if (!response.ok) {
        throw Error(response.statusText);
        // #TODO: Notification: Server Internal Error
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

// Simple wrapper of fetch
// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
// If normalizeSchema is specified, we normalize it using the given schema.
export function makeRequest(fetchUrl, normalizeSchema) {
    // fetch will only reject the promise when there is an internet error
    return fetch(fetchUrl)
        .catch(err => {
            throw Error('No Internet Connection!');
        })
        .then(handleErrors)
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

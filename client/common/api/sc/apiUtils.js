import url from 'url';
import qs from 'querystring';
import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
/**
 * Response success handler
 * @param  {object} response - response object from fetch web api
 * @returns {Promise}         - response json wrapped in Promise
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
  const token = sessionStorage.getItem('OAUTH_TOKEN');

  const finalUrl = url.resolve(baseUrl, endpoint);
  let finalParams = {
    ...queryParams,
  };
  if (token) {
    finalParams = {
      ...finalParams,
      oauth_token: token,
    };
  }

  const queryStr = qs.stringify(finalParams); // queryStr will be "" if queryParams is undefined
  console.log(queryStr);
  if (queryStr) {
    return `${finalUrl}?${queryStr}`;
  }
  return finalUrl;
}

// Normalize
export function normalizeResponse(jsonResponse, schema) {
  if (!schema) throw new Error('No Schema is provided to normalizeResponse function!');
  if (jsonResponse.collection) {
    const { nextHref, collection } = jsonResponse;
    // return Object.assign({}, normalize(collection, schema), { nextHref });
    return {
      ...normalize(collection, schema),
      nextHref,
    };
  }

  return {
    ...normalize(jsonResponse, schema),
  };
}

// Need to decouple data trasformation from making the ajax request
export function makeRequestAndNormalize(fetchUrl, normalizeSchema) {
  // fetch will only reject the promise when there is an internet error
  return (
    fetch(fetchUrl)
      .then(onResponseSuccess)
      .catch(err => {
        console.log(err);
        // Let the user know when there is a connection error!
        throw Error('Can not reach the server!');
      })
      // The following should not be coupled with this function here.
      .then(json => camelizeKeys(json))
      .then(camelizedJson => normalizeResponse(camelizedJson, normalizeSchema))
  );
}

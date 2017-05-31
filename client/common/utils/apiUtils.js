import url from 'url';
import qs from 'querystring';
import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { API_HOST } from 'client/common/constants/appConsts';
import { CLIENT_ID } from 'client/common/constants/authConsts';
import { normalizeResponse } from './normalizeUtils';

const SC_API_V2 = 'https://api-v2.soundcloud.com';

// https://api-v2.soundcloud.com
export function toProxyHost(fetchUrl) {
  return fetchUrl && fetchUrl.replace(`${SC_API_V2}`, `${API_HOST}`);
}

// Append client_id to the end of the original url
export function getUnauthUrl(originalUrl) {
  const newUrl = new URL(originalUrl);
  newUrl.searchParams.set('client_id', CLIENT_ID);
  return newUrl.toString();
}

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
  // console.log(queryStr);
  if (queryStr) {
    return `${finalUrl}?${queryStr}`;
  }
  return finalUrl;
}

export function makeRequest(fetchUrl, requireAuth = false) {
  let finalUrl = null;
  if (requireAuth) {
    // Get auth token and attach to url
  } else {
    finalUrl = getUnauthUrl(fetchUrl);
  }
  console.log('Request: ', finalUrl);
  return (
    fetch(finalUrl)
      .then(onResponseSuccess)
      .catch((err) => {
        console.log(err);
        // Let the user know when there is a connection error!
        throw Error('Can not reach the server!');
      })
      // The following should not be coupled with this function here.
      .then(json => camelizeKeys(json))
  );
}

// Remove it..
// Need to decouple data trasformation from making the ajax request
export function makeRequestAndNormalize(fetchUrl, normalizeSchema, requireAuth = false) {
  return makeRequest(fetchUrl, requireAuth).then(json => normalizeResponse(json, normalizeSchema));
}

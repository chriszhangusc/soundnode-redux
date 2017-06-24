import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { API_HOST, API_PROXY_ORIGIN } from 'common/constants/appConsts';
import { CLIENT_ID } from 'common/constants/authConsts';
import { getOAuthToken } from 'features/auth/authUtils';
import { setUrlParams } from './urlUtils';

const SC_API_V2 = 'https://api-v2.soundcloud.com';

const SC_API_V1 = 'https://api.soundcloud.com';

export function getStreamUrl(track) {
  if (track && (track.streamUrl || track.uri)) {
    const streamUrl = track.streamUrl || `${track.uri}/stream`;
    return `${streamUrl}?client_id=${CLIENT_ID}`;
  }
  return null;
}

// Transform requests like https://api-v2.soundcloud.com to http://localhost:3001 (Our proxy server)
export function transformSCV2Request(fetchUrl) {
  return fetchUrl && fetchUrl.replace(`${SC_API_V2}`, `${API_HOST}`);
}

/**
 * Response success handler
 * @param  {object} response - response object from fetch web api
 * @returns {Promise}         - response json wrapped in Promise
 */
export function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

// Transform json response
export function parseJson(response) {
  return response.json().then(json => camelizeKeys(json));
}

// export function getSCV1Url(endpoint) {
//   const v1Url = new URL(`${API_PROXY_ORIGIN}/sc/v1`, endpoint);
//   return v1Url.toString();
// }

// If we have authed already, use oauth_token, otherwise use client_id
export function appendTokenToUrl(fetchUrl) {
  const token = getOAuthToken();
  return token
    ? setUrlParams(fetchUrl, { oauth_token: token })
    : setUrlParams(fetchUrl, { client_id: CLIENT_ID });
}

export function makeRequest(fetchUrl, fetchOptions) {
  const finalUrl = appendTokenToUrl(fetchUrl);
  // console.log(finalUrl);
  return (
    fetch(finalUrl, fetchOptions)
      .then(checkStatus)
      // Should be removed!!
      .then(parseJson)
  );
}

export function getSCV1Url(endpoint) {
  return new URL(`/sc/v1${endpoint}`, `${API_PROXY_ORIGIN}`).toString();
}

export function getSCV2Url(endpoint) {
  return new URL(`/sc/v2${endpoint}`, `${API_PROXY_ORIGIN}`).toString();
}

export function makeSCV1Request(endpoint, fetchOptions) {
  const scV1Url = getSCV2Url(endpoint);
  return makeRequest(scV1Url, fetchOptions);
}

export function makeSCV2Request(endpoint, fetchOptions) {
  // const fetchUrl = `${SC_API_V2}${url}`;
  const scV2Url = getSCV2Url(endpoint);
  return makeRequest(scV2Url, fetchOptions);
}

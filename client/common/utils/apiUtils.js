import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { API_HOST } from 'client/common/constants/appConsts';
import { CLIENT_ID } from 'client/common/constants/authConsts';
import { getOAuthToken } from 'client/features/auth/authUtils';
import { setUrlParams } from './urlUtils';
import { normalizeResponse } from './normalizeUtils';

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

export function parseJson(response) {
  return response.json();
}

// If we have authed already, use oauth_token, otherwise use client_id
export function getSCApiUrl(fetchUrl) {
  const token = getOAuthToken();
  return token
    ? setUrlParams(fetchUrl, { oauth_token: token })
    : setUrlParams(fetchUrl, { client_id: CLIENT_ID });
}

export function makeRequest(fetchUrl, fetchOptions) {
  const finalUrl = getSCApiUrl(fetchUrl);
  console.log(finalUrl);
  return (
    fetch(finalUrl, fetchOptions)
      .then(checkStatus)
      // Should be removed!!
      .then(parseJson)
      .then(json => camelizeKeys(json))
  );
}

export function makeRequestTemp(fetchUrl, fetchOptions) {
  const finalUrl = getSCApiUrl(fetchUrl);
  return fetch(finalUrl, fetchOptions).then(checkStatus);
}

export function makeSCV1Request(url, fetchOptions) {
  const fetchUrl = `${SC_API_V1}${url}`;
  return makeRequest(fetchUrl, fetchOptions);
}

export function makeSCV2Request(url) {
  const fetchUrl = `${SC_API_V2}${url}`;
  const finalFetchUrl = transformSCV2Request(fetchUrl);
  return makeRequest(finalFetchUrl);
}

// Remove it..
// Need to decouple data trasformation from making the ajax request
export function makeRequestAndNormalize(fetchUrl, normalizeSchema) {
  return makeRequest(fetchUrl).then(json => normalizeResponse(json, normalizeSchema));
}

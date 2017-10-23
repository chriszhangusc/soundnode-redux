import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { API_PROXY } from 'common/constants/appConsts';
import { CLIENT_ID } from 'common/constants/authConsts';
import { getOAuthToken } from 'features/auth/authUtils';
import { SC_API_V1, SC_API_V2 } from 'common/constants/apiConsts';
import { setUrlParams } from './urlUtils';

export function getSCV2ProxyOrigin() {
  return `${API_PROXY}/sc/v2`;
}

export function getSCV1ProxyOrigin() {
  return `${API_PROXY}/sc/v1`;
}

export function isSCV1Request(requestUrl) {
  return requestUrl && requestUrl.startsWith(SC_API_V1);
}

export function isSCV2Request(requestUrl) {
  return requestUrl && requestUrl.startsWith(SC_API_V2);
}

export function getStreamUrl(track) {
  if (track && (track.streamUrl || track.uri)) {
    const streamUrl = track.streamUrl || `${track.uri}/stream`;
    return `${streamUrl}?client_id=${CLIENT_ID}`;
  }
  return null;
}

export function getProxyRequest(requestUrl) {
  if (!requestUrl) return requestUrl;
  if (isSCV1Request(requestUrl)) return requestUrl.replace(`${SC_API_V1}`, getSCV1ProxyOrigin());
  if (isSCV2Request(requestUrl)) return requestUrl.replace(`${SC_API_V2}`, getSCV2ProxyOrigin());
  return requestUrl;
}

// If we have authed already, use oauth_token, otherwise use client_id
export function appendToken(requestUrl) {
  const token = getOAuthToken();
  return token
    ? setUrlParams(requestUrl, { oauth_token: token })
    : setUrlParams(requestUrl, { client_id: CLIENT_ID });
}

export function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

// Transform json response
export function parseJsonAndCamelize(response) {
  return response.json().then(json => camelizeKeys(json));
}

// Check if the fetchUrl is v1 or v2 and convert them to point to our proxy server accordingly
export function makeRequest(requestUrl, fetchOptions) {
  const proxyRequest = getProxyRequest(requestUrl);
  const finalUrl = appendToken(proxyRequest);
  console.log(finalUrl);
  return fetch(finalUrl, fetchOptions)
    .then(checkStatus)
    .then(parseJsonAndCamelize);
}

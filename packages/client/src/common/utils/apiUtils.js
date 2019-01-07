import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { API_PROXY } from '@soundnode-redux/client/src/common/constants/appConsts';
import { CLIENT_ID } from '@soundnode-redux/client/src/common/constants/authConsts';
import { getOAuthToken } from '@soundnode-redux/client/src/features/auth/authUtils';
import { SC_API_V1, SC_API_V2 } from '@soundnode-redux/client/src/common/constants/apiConsts';
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
  // if (isSCV1Request(requestUrl)) return requestUrl.replace(`${SC_API_V1}`, getSCV1ProxyOrigin());
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

export function parseJson(response) {
  // No content
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json().then(camelizeKeys);
}

export function buildRequestUrl(url) {
  return appendToken(getProxyRequest(url));
}

// Check if the fetchUrl is v1 or v2 and convert them to point to our proxy server accordingly
// Do not use this function with put because soundcloud api will return 200 even if
// there is no content and would 30+ seconds.
export function makeRequest(requestUrl, fetchOptions) {
  const finalUrl = buildRequestUrl(requestUrl);
  return fetch(finalUrl, fetchOptions)
    .then(checkStatus)
    .then(parseJson);
}

const defaultPutOptions = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
};

export function requestPut(requestUrl, data, options = defaultPutOptions) {
  const finalUrl = buildRequestUrl(requestUrl);
  return fetch(finalUrl, { ...options, body: JSON.stringify(data) });
}

const defaultGetOptions = { method: 'GET' };

export function requestGet(requestUrl, options = defaultGetOptions) {
  const finalUrl = buildRequestUrl(requestUrl);
  return fetch(finalUrl, options);
}

const defaultDeleteOptions = { method: 'DELETE' };

export function requestDelete(requestUrl, options = defaultDeleteOptions) {
  const finalUrl = buildRequestUrl(requestUrl);
  return fetch(finalUrl, options);
}

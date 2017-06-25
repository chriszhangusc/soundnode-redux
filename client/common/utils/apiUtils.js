import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { API_PROXY_ORIGIN } from 'common/constants/appConsts';
import { CLIENT_ID } from 'common/constants/authConsts';
import { getOAuthToken } from 'features/auth/authUtils';
import { SC_API_V1, SC_API_V2 } from 'common/constants/apiConsts';

import { setUrlParams } from './urlUtils';


function getSCV2ProxyOrigin() {
  return `${API_PROXY_ORIGIN}/sc/v2`;
}

function getSCV1ProxyOrigin() {
  return `${API_PROXY_ORIGIN}/sc/v1`;
}

function isSCV1Request(requestUrl) {
  return requestUrl && requestUrl.startsWith(SC_API_V1);
}

function isSCV2Request(requestUrl) {
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

// If we have authed already, use oauth_token, otherwise use client_id
export function appendTokenToUrl(fetchUrl) {
  const token = getOAuthToken();
  return token
    ? setUrlParams(fetchUrl, { oauth_token: token })
    : setUrlParams(fetchUrl, { client_id: CLIENT_ID });
}

// Check if the fetchUrl is v1 or v2 and convert them to point to our proxy server accordingly
export function makeRequest(requestUrl, fetchOptions) {
  const proxyRequest = getProxyRequest(requestUrl);
  const finalUrl = appendTokenToUrl(proxyRequest);
  return (
    fetch(finalUrl, fetchOptions)
      .then(checkStatus)
      .then(parseJson)
  );
}


import { CLIENT_ID } from 'client/constants/Config';
import {
  large
} from 'client/constants/ImageConstants';

export const formatSecondsAsTime = (secs) => {
  const hr = Math.floor(secs / 3600);
  let min = Math.floor((secs - (hr * 3600)) / 60);
  let sec = Math.floor(secs - (hr * 3600) - (min * 60));
  if (min < 10) {
    min = `0${min}`;
  }
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

export function formatImageUrl(rawUrl, size = large) {
  // Check size
  if (rawUrl && rawUrl.indexOf(large) > -1) {
    return rawUrl.replace(large, size);
  }
  return rawUrl;
}

/**
 * Generate stream url given song obj
 * @param  {String} rawUrl Stream url comming from the song object
 * @return {String} Stream url appended by client_id
 */
export function formatStreamUrl(rawUrl) {
  return (rawUrl ? `${rawUrl}/stream?client_id=${CLIENT_ID}` : null);
}

export const formatTitle = (title) => {
  const res = title.split(' - ');
  return res.length === 1 ? res[0] : res[1];
};

export function formatGenre(genre) {
  // Get rid of everything that is not a letter, and convert to lowercase
  //  e.g. Hip-hop & Rap will be hiphoprap
  const lowercase = genre.toLowerCase();
  return lowercase === 'all-music' ? lowercase : lowercase.replace(/[^a-z]+/g, '');
}

/**
 * Add query strings to an url
 * @param  {[type]} url    [description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function concatParamsToUrl(url, params) {
  let resultUrl = url;
  let count = 0;
  for (const param in params) {
    if (params.hasOwnProperty(param)) {
      if (count === 0) {
        resultUrl += `?${param}=${encodeURIComponent(params[param])}`;
      } else {
        resultUrl += `&${param}=${encodeURIComponent(params[param])}`;
      }
      count += 1;
    }
  }

  return resultUrl;
}

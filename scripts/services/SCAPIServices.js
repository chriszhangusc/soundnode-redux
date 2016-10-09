/* SoundCloud API V1 */
import axios from 'axios';
import { CLIENT_ID } from 'client/constants/Config';

const SC_API_V1 = 'https://api.soundcloud.com';

const endpoints = {
  users: 'users',
  tracks: 'tracks'
};

const DEFAULT_LIMIT = 4;

function genFetchUrl(endpoint, limit, keyword) {
  return `${SC_API_V1}/${endpoint}?linked_partitioning=1&limit=${limit}&q=${keyword}&client_id=${CLIENT_ID}`;
}

/**
 * Fetch a single user by uid
 * @param  number uid User id
 * @return Promise
 */
export function fetchUser(uid) {
  const url = `${SC_API_V1}/users/${uid}?&client_id=${CLIENT_ID}`;
  return axios.get(url);
}

/**
 * Fetch all tracks of a user specified by uid
 * @return Promise
 */
export function fetchUserTracks(uid) {
  const url = `${SC_API_V1}/users/${uid}/tracks?client_id=${CLIENT_ID}&linked_partitioning=1&limit=10`;
  return axios.get(url);
}

/**
 * Fetch a single track by id
 * @param  number trackId
 * @return Promise
 */
export function fetchTrack(trackId) {
  const url = `${SC_API_V1}/tracks/${trackId}?client_id=${CLIENT_ID}`;
  return axios.get(url);
}

/**
 * Search for a list of users by keyword
 * @param  {[type]} keyword               [description]
 * @param  {[type]} [limit=DEFAULT_LIMIT] [description]
 * @return {[type]}                       [description]
 */
export function fetchUsers(keyword, limit = DEFAULT_LIMIT) {
  const url = genFetchUrl(endpoints.users, limit, keyword);
  return axios.get(url);
}

export function fetchTracks(keyword, limit = DEFAULT_LIMIT) {
  const url = genFetchUrl(endpoints.tracks, limit, keyword);
  return axios.get(url);
}

/* SoundCloud API V1 */
import axios from 'axios';
import { CLIENT_ID } from '../constants/Config';

const SC_API_V1 = 'https://api.soundcloud.com';

const endpoints = {
  users: 'users',
  tracks: 'tracks'
};

const DEFAULT_LIMIT = 4;

function genFetchUrl(endpoint, limit, keyword) {
  return `${SC_API_V1}/${endpoint}?linked_partitioning=1&limit=${limit}&q=${keyword}&client_id=${CLIENT_ID}`;
}

export function fetchUsers(keyword, limit = DEFAULT_LIMIT) {
  const url = genFetchUrl(endpoints.users, limit, keyword);
  return axios.get(url);
}

export function fetchTracks(keyword, limit = DEFAULT_LIMIT) {
  const url = genFetchUrl(endpoints.tracks, limit, keyword);
  return axios.get(url);
}

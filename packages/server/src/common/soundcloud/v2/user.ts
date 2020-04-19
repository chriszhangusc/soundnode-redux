import axios from 'axios';
import { BASE_V2 } from '../consts';
import { camelizeData, parseResponse } from '../utilities';
import { CLIENT_ID_V2 } from '../../env';
/**
 * Get track by id
 * @param {Number} trackId
 */
export function getUserById(userId: number) {
  return axios
    .get(`${BASE_V2}/users/${userId}?client_id=${CLIENT_ID_V2}`)
    .then(parseResponse)
    .then(camelizeData);
}

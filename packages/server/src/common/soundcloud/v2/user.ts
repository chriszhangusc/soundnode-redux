import axios from 'axios';
import { BASE_V2 } from '../consts';
import { camelizeData, parseResponse } from '../utilities';
import { CLIENT_ID } from '../../env';
/**
 * Get track by id
 * @param {Number} trackId
 */
export function getUserById(userId: number, clientId: string = CLIENT_ID) {
  return axios
    .get(`${BASE_V2}/users/${userId}?client_id=${clientId}`)
    .then(parseResponse)
    .then(camelizeData);
}

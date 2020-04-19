import axios from 'axios';
import { CLIENT_ID_V1 } from '../../../common/env';
import { BASE_V1 } from '../consts';
import { camelizeData, parseResponse } from '../utilities';

// TODO: CLIENT_ID should be passed in by the client
/**
 * Get user by id
 * @param {Number} userId
 */
export function getUserById(userId: number) {
  return axios
    .get(`${BASE_V1}/users/${userId}?client_id=${CLIENT_ID_V1}`)
    .then(parseResponse)
    .then(camelizeData);
}

import axios from 'axios';
import { CLIENT_ID_V1 } from '../../../common/env';
import { BASE_V1 } from '../consts';
import { camelizeData, parseResponse } from '../utilities';

// TODO: CLIENT_ID should be passed in by the client
/**
 * Get track by id
 * @param {Number} trackId
 */
export function getTrackById(trackId: number) {
  console.log(`${BASE_V1}/tracks/${trackId}?client_id=${CLIENT_ID_V1}`);
  return axios
    .get(`${BASE_V1}/tracks/${trackId}?client_id=${CLIENT_ID_V1}`)
    .then(parseResponse)
    .then(camelizeData);
}

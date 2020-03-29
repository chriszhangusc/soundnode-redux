import axios from 'axios';
import { CLIENT_ID } from '../../../common/env';
import { BASE_V1 } from '../consts';
import { camelizeData, parseResponse } from '../utilities';

export function getCommentById() {}

const DEFAULT_COMMENTS_LIMIT = 25;

export function getCommentsByTrackId(
  trackId: number,
  offset: number = 0,
  limit: number = DEFAULT_COMMENTS_LIMIT,
) {
  return axios
    .get(
      `${BASE_V1}/tracks/${trackId}/comments?linked_partitioning=1&offset=${offset}&limit=${limit}&client_id=${CLIENT_ID}`,
    )
    .then(parseResponse)
    .then(camelizeData);
}

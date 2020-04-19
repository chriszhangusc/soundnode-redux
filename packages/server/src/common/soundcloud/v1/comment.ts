import axios from 'axios';
import { CLIENT_ID_V1 } from '../../../common/env';
import { BASE_V1 } from '../consts';
import { camelizeData, parseResponse } from '../utilities';

// TODO: Not Implemented
export function getCommentById() {
  return null;
}

const DEFAULT_COMMENTS_LIMIT = 25;

export function getCommentsByTrackId(
  trackId: number,
  offset = 0,
  limit: number = DEFAULT_COMMENTS_LIMIT,
) {
  return axios
    .get(
      `${BASE_V1}/tracks/${trackId}/comments?linked_partitioning=1&offset=${offset}&limit=${limit}&client_id=${CLIENT_ID_V1}`,
    )
    .then(parseResponse)
    .then(camelizeData);
}

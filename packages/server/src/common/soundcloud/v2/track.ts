import axios from 'axios';
import { BASE_V2 } from '../consts';
import { camelizeData, parseResponse } from '../utilities';
import { CLIENT_ID_V2 } from '../../env';
/**
 * Get track by id
 * @param {Number} trackId
 */
export function getTrackById(trackId: number) {
  return axios
    .get(`${BASE_V2}/tracks/${trackId}?client_id=${CLIENT_ID_V2}`)
    .then(parseResponse)
    .then(camelizeData);
}

interface ChartsTrack {
  artworkUrl: string;
  createdAt: string;
  description?: string;
  duration: number;
  genre: string;
  id: number;
  // TODO: There are way more to add
}

interface ChartsCollectionItem {
  track: ChartsTrack;
  score: number;
}

interface ChartsResponse {
  genre: string;
  kind: string;
  lastUpdated: string;
  collection: ChartsCollectionItem[];
  queryUrn: string;
  nextHref: string;
}

/**
 * Get top charts by genre
 */
export async function getCharts(
  genre: string,
  offset: number,
  limit: number,
): Promise<ChartsResponse> {
  return axios
    .get(
      `${BASE_V2}/charts?kind=top&genre=soundcloud:genres:${genre}&linked_partitioning=1&limit=${limit}&offset=${offset}&client_id=${CLIENT_ID_V2}`,
    )
    .then(parseResponse)
    .then(camelizeData);
}

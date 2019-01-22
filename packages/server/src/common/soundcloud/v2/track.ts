import axios from 'axios';
import { BASE_V2 } from '../consts';
import { camelizeData, parseResponse } from '../utilities';
import { CLIENT_ID } from '../../env';
/**
 * Get track by id
 * @param {Number} trackId
 */
export function getTrackById(trackId: number, clientId: string = CLIENT_ID) {
  return axios
    .get(`${BASE_V2}/tracks/${trackId}?client_id=${clientId}`)
    .then(parseResponse)
    .then(camelizeData);
}

type ChartsTrack = {
  artworkUrl: string;
  createdAt: string;
  description?: string;
  duration: number;
  genre: string;
  id: number;
  // TODO: There are way more to add
};

type ChartsCollectionItem = {
  track: ChartsTrack;
  score: number;
};

type IChartsResponse = {
  genre: string;
  kind: string;
  lastUpdated: string;
  collection: ChartsCollectionItem[];
  queryUrn: string;
  nextHref: string;
};

/**
 * Get top charts by genre
 */
export async function getCharts(
  genre: string,
  offset: number,
  limit: number,
  clientId: string = 'ZsXqrJ5fvCT0kw8AbbJARqxuRVYqAVEX',
  // clientId: string = 'AdBAY9M0wHTRovngU9Ht4Z63XezL9saK',
): Promise<IChartsResponse> {
  return axios
    .get(
      `${BASE_V2}/charts?kind=top&genre=soundcloud:genres:${genre}&linked_partitioning=1&limit=${limit}&offset=${offset}&client_id=${clientId}`,
    )
    .then(parseResponse)
    .then(camelizeData);
}

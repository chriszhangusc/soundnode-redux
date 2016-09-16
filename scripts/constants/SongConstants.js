import {CLIENT_ID} from './Config';
export const GENRES = [
  'chill',
  'deep',
  'dubstep',
  'house',
  'progressive',
  'tech',
  'trance',
  'tropical'
];

export const SEED_FETCH_URL =
`https://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&offset=0&limit=50`;

export const DEFAULT_GENRE = GENRES[0];// chill

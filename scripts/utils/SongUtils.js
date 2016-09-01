import {SEED_FETCH_URL} from '../constants/SongConstants';
export const generateFetchUrl = (genre) => {
  // make sure genre is valid
  // concat fetch url
  // const url = `${SEED_FETCH_URL}&tags=${genre}`;
  const url = `${SEED_FETCH_URL}&genres=${genre}`;
  return url;
};

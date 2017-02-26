import { LOOP, SHUFFLE, REPEAT, NEXT, PREV } from 'client/constants/PlayerConstants';
/**
 * Generate fetch url by given query
 * @param {String} rawQuery
 * @return {String} url
 */
// export const generateFetchUrl = (rawQuery) => {
//   // const url = `${SEED_FETCH_URL}&tags=${genre}`;
//   const query = rawQuery.trim().toUpperCase();
//   let url = null;
//   if (query in GENRES) {
//     // Genre search
//     url = `${SEED_FETCH_URL}&genres=${query}`;
//   } else {
//     // Nav bar search
//     url = `${SEED_FETCH_URL}&q=${query}`;
//   }
//   return url;
// };

export const generateTopGenreFetchUrl = (rawQuery) => {
  let query = rawQuery.trim().toLowerCase();
  if (query === 'all') query = 'all-music';
  // const queryStr = `&genre=soundcloud:genres:${query}`;
  // const url = `${TOP_FETCH_URL}${queryStr}`;
  const url = TOP_FETCH_URL;
  return url;
};

// const getRandomIntInclusive = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   let res = Math.floor(Math.random() * (max - min + 1)) + min;
//   return res;
// }

const getLoopNext = (songId, songIds) => {
  let nextSongId = null;
  const firstId = songIds[0];
  for (let i = 0; i < songIds.length; i += 1) {
    if (songIds[i] === songId) {
      nextSongId = i + 1 < songIds.length ? songIds[i + 1] : firstId;
      break;
    }
  }
  return nextSongId;
};

const getLoopPrev = (songId, songIds) => {
  let prevSongId = null;
  const lastId = songIds[songIds.length - 1];
  for (let i = 0; i < songIds.length; i += 1) {
    if (songIds[i] === songId) {
      prevSongId = i - 1 >= 0 ? songIds[i - 1] : lastId;
      break;
    }
  }
  return prevSongId;
};

// Get a random song from shuffleDraw return it and add it to shuffleDiscard
// const getShufflePrev = () => {};
//
// const getShuffleNext = (songId, songIds) => {
//   return pickRandomProperty(songIds);
// };

export const getSongIdByMode = (songId, songIds, mode, method) => {
  if (songIds.length === 0) return null;
  switch (mode) {
    case LOOP:
      if (method === NEXT) return getLoopNext(songId, songIds);
      if (method === PREV) return getLoopPrev(songId, songIds);
      break;
    case SHUFFLE:

      break;
    case REPEAT:
      return songId;
    default:
      break;
  }
  return null;
};

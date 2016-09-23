import { GENRES, SEED_FETCH_URL } from '../constants/SongConstants';
import { CLIENT_ID } from '../constants/Config';
import { LOOP, SHUFFLE, REPEAT, NEXT, PREV } from '../constants/PlayerConstants';

export const generateFetchUrl = (genre) => {
  // const url = `${SEED_FETCH_URL}&tags=${genre}`;
  genre = genre.trim();
  let url = null;
  if (genre in GENRES) {
    // Genre search
    url = `${SEED_FETCH_URL}&genres=${genre}`;
  } else {
    // General search
    url = `${SEED_FETCH_URL}&q=${genre}`;
  }

  return url;
};

export const generateStreamUrl = (song) => {
  if (!song) return null;
  let streamUrl = null;
  if (song.stream_url)
    streamUrl = `${song.stream_url}?client_id=${CLIENT_ID}`;
  return streamUrl;
}



// const getRandomIntInclusive = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   let res = Math.floor(Math.random() * (max - min + 1)) + min;
//   return res;
// }

const getLoopNext = (songId, songIds) => {
  let nextSongId = null;
  const firstId = songIds[0];
  for (let i = 0; i < songIds.length; i++) {
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
  for (let i = 0; i < songIds.length; i++) {
    if (songIds[i] === songId) {
      prevSongId = i - 1 >= 0 ? songIds[i - 1] : lastId;
      break;
    }
  }
  return prevSongId;
}

const getShufflePrev = () => {}
const getShuffleNext = () => {}

export const getSongIdByMode = (songId, songIds, mode, method) => {
  if (songIds.length === 0) return null;
  switch (mode) {
    case LOOP:
      if (method === NEXT) return getLoopNext(songId, songIds);
      if (method === PREV) return getLoopPrev(songId, songIds);
      break;
    case SHUFFLE:
      if (method === NEXT) return getShuffleNext(songId, songIds);
      if (method === PREV) return getShufflePrev(songId, songIds);
      break;
    case REPEAT:
      return songId;
    default:
      return null;
  }
}

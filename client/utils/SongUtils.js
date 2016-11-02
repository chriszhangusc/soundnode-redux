import { LOOP, SHUFFLE, REPEAT, NEXT, PREV } from 'client/redux/modules/player';

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

export const getTrackIdByMode = (trackId, playlist, mode, method) => {
  if (playlist.length === 0) return null;
  switch (mode) {
    case LOOP:
      if (method === NEXT) return getLoopNext(trackId, playlist);
      if (method === PREV) return getLoopPrev(trackId, playlist);
      break;
    case SHUFFLE:

      break;
    case REPEAT:
      return trackId;
    default:
      break;
  }
  return null;
};

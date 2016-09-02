import {SEED_FETCH_URL} from '../constants/SongConstants';
export const generateFetchUrl = (genre) => {
  // make sure genre is valid
  // concat fetch url
  // const url = `${SEED_FETCH_URL}&tags=${genre}`;
  const url = `${SEED_FETCH_URL}&genres=${genre}`;
  return url;
};


export const getPrevSong = (currentSong, playlist) => {
  let prevSong = null;
  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].id === currentSong.id && i !== 0) {
      prevSong = playlist[i - 1];
    }
  }
  return prevSong;
}

export const getNextSong = (currentSong, playlist) => {
  let nextSong = null;

  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].id === currentSong.id && i + 1 < playlist.length) {
      nextSong = playlist[i + 1];
    }
  }

  return nextSong;
}

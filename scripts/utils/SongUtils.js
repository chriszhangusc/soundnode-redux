import {SEED_FETCH_URL} from '../constants/SongConstants';
import {CLIENT_ID} from '../constants/Config';

export const generateFetchUrl = (genre) => {
  // const url = `${SEED_FETCH_URL}&tags=${genre}`;
  const url = `${SEED_FETCH_URL}&genres=${genre}`;
  return url;
};

export const generateStreamUrl = (song) => {
  let streamUrl = null;
  if (song.stream_url)
    streamUrl = `${song.stream_url}?client_id=${CLIENT_ID}`;
  return streamUrl;
}

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

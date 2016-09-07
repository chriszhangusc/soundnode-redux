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

export const getShuffledSong = () => {
  
}

export const getPrevSong = (currentSong, songs, mode) => {
  let prevSong = null;
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].id === currentSong.id) {
      if (i > 0) prevSong = songs[i - 1];
      else prevSong = songs[songs.length - 1];
    }
  }
  return prevSong;
}

export const getNextSong = (currentSong, songs, mode) => {
  let nextSong = null;
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].id === currentSong.id) {
      if (i + 1 < songs.length) nextSong = songs[i + 1];
      else nextSong = songs[0];
    }
  }
  return nextSong;
}

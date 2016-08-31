import {PLAY_SONG, PAUSE_SONG} from '../constants/ActionTypes';
// Add song clicked by user to active song, and start playing
export const playSong = (song) => {
  return {
    type: PLAY_SONG,
    song: song,
  };
};

// Pause currently playing song
export const pauseSong = () => {
  return {
    type: PAUSE_SONG,
  };
};

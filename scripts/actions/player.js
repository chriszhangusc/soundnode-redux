import {UPDATE_TIME, PLAY_SONG, PAUSE_SONG} from '../constants/ActionTypes';

export const updateTime = (currentTime) => {
  return {
    type: UPDATE_TIME,
    currentTime,
  };
};

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

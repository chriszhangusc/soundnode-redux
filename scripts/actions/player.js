import {UPDATE_TIME, PLAY_SONG, PAUSE_SONG} from '../constants/ActionTypes';

export const updateTime = (currentTime) => {

  return {
    type: UPDATE_TIME,
    currentTime,
  };
};

export const handleTimeUpdate = (e) => {
  return (dispatch, getState) => {

    const audioElement = e.target;
    const {player} = getState();

    let currentTime = Math.floor(audioElement.currentTime);
    let duration = Math.floor(audioElement.duration);

    if (currentTime !== player.currentTime) {
      dispatch(updateTime(currentTime));
    }

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

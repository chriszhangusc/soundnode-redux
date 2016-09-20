import * as ActionTypes from '../constants/ActionTypes';
import { DEFAULT_MODE } from '../constants/PlayerConstants';

/* Pure actions */
export const toggleSeek = () => ({ type: ActionTypes.TOGGLE_SEEK })

export const beginSeek = () => ({ type: ActionTypes.BEGIN_SEEK })

export const endSeek = () => ({ type: ActionTypes.END_SEEK })

export const playSong = () => ({ type: ActionTypes.PLAY_SONG })

export const pauseSong = () => ({ type: ActionTypes.PAUSE_SONG })

export const beginVolumeSeek = () => ({ type: ActionTypes.BEGIN_VOLUME_SEEK })

export const endVolumeSeek = () => ({ type: ActionTypes.END_VOLUME_SEEK })

export const updateTime = (currentTime) => ({
  type: ActionTypes.UPDATE_TIME,
  currentTime
})

export const changeDuration = (duration) => ({
  type: ActionTypes.CHANGE_DURATION,
  duration
})

export const changeSong = (newSongId) => ({
  type: ActionTypes.CHANGE_SONG,
  songId: newSongId
})

export const loadPlayerPlaylist = (playlist) => ({
  type: ActionTypes.LOAD_PLAYER_PLAYLIST,
  payload: playlist
})

export const changeVolume = (volume) => ({
  type: ActionTypes.CHANGE_VOLUME,
  volume
})

export const switchMode = (mode) => ({
  type: ActionTypes.SWITCH_MODE,
  mode
})

export const toggleMute = () => {
  return {
    type: ActionTypes.TOGGLE_MUTE
  };
};

export const changePlayMode = (mode) => {
  return {
    type: ActionTypes.CHANGE_PLAY_MODE,
    payload: mode
  };
};

export const playNextSong = () => {
  return {
    type: ActionTypes.PLAY_NEXT_SONG
  };
};

export const playPrevSong = () => {
  return {
    type: ActionTypes.PLAY_PREV_SONG
  };
};


export const onRegularTimeUpdate = (newTime) => {
  return {
    type: ActionTypes.UPDATE_TIME_ON_PLAY,
    payload: newTime
  };
};

export const onSeekTimeUpdate = (newTime) => {
  return {
    type: ActionTypes.UPDATE_TIME_ON_SEEK,
    payload: newTime
  }
}

// Saga action
export const updateTimeAndEndSeek = (newTime) => {
  return {
    type: ActionTypes.UPDATE_TIME_AND_END_SEEK,
    payload: newTime
  };
};

export const updateVolumeAndEndSeek = (newVolume) => {
  return {
    type: ActionTypes.UPDATE_VOLUME_AND_END_SEEK,
    payload: newVolume
  }
}

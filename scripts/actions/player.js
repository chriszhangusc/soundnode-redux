import * as ActionTypes from '../constants/ActionTypes';

/* Pure actions */
export const toggleSeek = () => ({ type: ActionTypes.TOGGLE_SEEK });

export const beginSeek = () => ({ type: ActionTypes.BEGIN_SEEK });

export const endSeek = () => ({ type: ActionTypes.END_SEEK });

export const playSong = () => ({ type: ActionTypes.PLAY_SONG });

export const pauseSong = () => ({ type: ActionTypes.PAUSE_SONG });

export const beginVolumeSeek = () => ({ type: ActionTypes.BEGIN_VOLUME_SEEK });

export const endVolumeSeek = () => ({ type: ActionTypes.END_VOLUME_SEEK });

export const mute = () => ({ type: ActionTypes.MUTE });

export const clearTime = () => ({ type: ActionTypes.CLEAR_TIME });

export const updateTime = currentTime => ({
  type: ActionTypes.UPDATE_TIME,
  payload: currentTime
});

export const changeDuration = duration => ({
  type: ActionTypes.CHANGE_DURATION,
  payload: duration
});

export const changeSong = newSongId => ({
  type: ActionTypes.CHANGE_SONG,
  payload: newSongId
});

export const loadPlayerPlaylist = playlist => ({
  type: ActionTypes.LOAD_PLAYER_PLAYLIST,
  payload: playlist
});

export const changeVolume = volume => ({
  type: ActionTypes.CHANGE_VOLUME,
  payload: volume
});

export const switchMode = mode => ({
  type: ActionTypes.SWITCH_MODE,
  payload: mode
});

export const toggleMute = () => ({
  type: ActionTypes.TOGGLE_MUTE
});

// Saga Commands (Actions that has side effects)
export const changePlayMode = mode => ({
  type: ActionTypes.CHANGE_PLAY_MODE,
  payload: mode
});

export const playNextSong = () => ({
  type: ActionTypes.PLAY_NEXT_SONG
});

export const playPrevSong = () => ({
  type: ActionTypes.PLAY_PREV_SONG
});

export const onRegularTimeUpdate = newTime => ({
  type: ActionTypes.UPDATE_TIME_ON_PLAY,
  payload: newTime
});

export const onSeekTimeUpdate = newTime => ({
  type: ActionTypes.UPDATE_TIME_ON_SEEK,
  payload: newTime
});

export const updateTimeAndEndSeek = newTime => ({
  type: ActionTypes.UPDATE_TIME_AND_END_SEEK,
  payload: newTime
});

export const updateVolumeAndEndSeek = newVolume => ({
  type: ActionTypes.UPDATE_VOLUME_AND_END_SEEK,
  payload: newVolume
});

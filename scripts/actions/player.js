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

/**
 * Create INIT_SHUFFLE action
 * @param  {Array}  An array of songIds
 * @return {Object} INIT_SHUFFLE action
 */
export const initShuffle = songIds => ({ type: ActionTypes.INIT_SHUFFLE, payload: songIds });

/**
 * Create SHUFFLE_DRAW action
 * @param  {Number} songId The songId we want to remove from the shuffleDraw list
 * @return {Object}        SHUFFLE_DRAW action
 */
export const shuffleDraw = songId => ({ type: ActionTypes.SHUFFLE_DRAW, payload: songId });

/**
 * Create SHUFFLE_DISCARD action
 * @param  {Number} songId The songId we want to add to the shuffleDiscard list
 * @return {Object}        SHUFFLE_DISCARD
 */
export const shuffleDiscard = songId => ({ type: ActionTypes.SHUFFLE_DISCARD, payload: songId });

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

export const changeMode = mode => ({
  type: ActionTypes.CHANGE_MODE,
  payload: mode
});

// Saga Actions (Actions that will trigger a saga and execute side effects)
export const sagaToggleMute = () => ({
  type: ActionTypes.SAGA_TOGGLE_MUTE
});

// Import from player
export const sagaChangeSongAndPlay = songId => ({
  type: ActionTypes.SAGA_CHANGE_SONG_AND_PLAY,
  payload: songId
});

export const sagaChangePlayMode = mode => ({
  type: ActionTypes.SAGA_CHANGE_PLAY_MODE,
  payload: mode
});

export const sagaPlayNextSong = () => ({
  type: ActionTypes.SAGA_PLAY_NEXT_SONG
});

export const sagaPlayPrevSong = () => ({
  type: ActionTypes.SAGA_PLAY_PREV_SONG
});

export const sagaUpdateTimeOnPlay = newTime => ({
  type: ActionTypes.SAGA_UPDATE_TIME_ON_PLAY,
  payload: newTime
});

export const sagaUpdateTimeOnSeek = newTime => ({
  type: ActionTypes.SAGA_UPDATE_TIME_ON_SEEK,
  payload: newTime
});

export const sagaUpdateTimeAndEndSeek = newTime => ({
  type: ActionTypes.SAGA_UPDATE_TIME_AND_END_SEEK,
  payload: newTime
});

export const sagaUpdateVolumeAndEndSeek = newVolume => ({
  type: ActionTypes.SAGA_UPDATE_VOLUME_AND_END_SEEK,
  payload: newVolume
});

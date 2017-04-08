import { clearShufflePlaylist, shufflePlaylist } from 'client/redux/modules/playlist/actions';
import { getPlaylistByMode } from 'client/redux/modules/playlist/selectors';

import { getLastVolume, setLastVolume } from 'client/utils/LocalStorageUtils';

import { DEFAULT_MODE, REPEAT, NEXT, PREV, SHUFFLE } from './consts';


import {
  isPlayerSeeking,
  getCurrentTime,
  getCurrentVolume,
  getCurrentPlayerTrack,
  getPlayerTrackId,
  getPlayerMode,
} from './selectors';

import {
  BEGIN_SEEK,
  END_SEEK,
  PLAY_SONG,
  PAUSE_SONG,
  BEGIN_VOLUME_SEEK,
  END_VOLUME_SEEK,
  MUTE,
  CLEAR_TIME,
  UPDATE_TIME,
  CHANGE_VOLUME,
  CHANGE_PLAY_MODE,
  CHANGE_SONG,
} from './types';


/* Action Creators */
export const beginSeek = () => ({ type: BEGIN_SEEK });

export const endSeek = () => ({ type: END_SEEK });

export const playSong = () => ({ type: PLAY_SONG });

export const pauseSong = () => ({ type: PAUSE_SONG });

export const beginVolumeSeek = () => ({ type: BEGIN_VOLUME_SEEK });

export const endVolumeSeek = () => ({ type: END_VOLUME_SEEK });

export const mute = () => ({ type: MUTE });

export const clearTime = () => ({ type: CLEAR_TIME });

export const changeSong = trackId => ({
  type: CHANGE_SONG,
  payload: trackId,
});

export const updateTime = currentTime => ({
  type: UPDATE_TIME,
  payload: currentTime,
});

export const changeVolume = volume => ({
  type: CHANGE_VOLUME,
  payload: volume,
});

export const changePlayMode = mode => ({
  type: CHANGE_PLAY_MODE,
  payload: mode,
});

/* Redux Thunks Domain Logic */
export function updateTimeIfNeeded(rawTime) {
  return (dispatch, getState) => {
    const state = getState();
    const newTime = Math.floor(rawTime);
    const currentTime = getCurrentTime(state);
    if (newTime !== currentTime) {
      dispatch(updateTime(newTime));
    }
  };
}

export function updateTimeOnPlay(time) {
  return (dispatch, getState) => {
    const state = getState();
    const seeking = isPlayerSeeking(state);
    if (!seeking) {
      dispatch(updateTimeIfNeeded(time));
    }
  };
}

export function updateTimeOnSeek(time) {
  return (dispatch) => {
    dispatch(updateTimeIfNeeded(time));
  };
}

export function updateTimeAndEndSeek(time) {
  return (dispatch) => {
    dispatch(updateTimeIfNeeded(time));
    dispatch(endSeek());
  };
}

export function updateVolumeAndEndSeek(volume) {
  return (dispatch) => {
    dispatch(changeVolume(volume));
    dispatch(endVolumeSeek());
  };
}

export function toggleMute() {
  return (dispatch, getState) => {
    const state = getState();
    const currVolume = getCurrentVolume(state);
    if (currVolume === 0) {
      const lastVolume = getLastVolume();
      dispatch(changeVolume(lastVolume));
    } else {
      setLastVolume(currVolume);
      dispatch(mute());
    }
  };
}


// Change to new song or just play paused current song.
export function changeSongAndPlay(newTrackId) {
  return (dispatch, getState) => {
    const state = getState();
    const curTrackId = getCurrentPlayerTrack(state);
    dispatch(pauseSong());
    dispatch(clearTime());

    if (curTrackId !== newTrackId) {
      dispatch(changeSong(newTrackId));
    }
    dispatch(playSong());
  };
}

// When we click on next or prev.
export function playSongByAction(actionType) {
  return (dispatch, getState) => {
    const state = getState();
    const mode = getPlayerMode(state);
    let nextTrackId = null;
    const curTrackId = getPlayerTrackId(state);
    const activePlaylist = getPlaylistByMode(state);
    if (mode === REPEAT) {
      nextTrackId = curTrackId;
    } else {
      // debugger;
      const idx = activePlaylist.indexOf(curTrackId);
      let nextIdx = actionType === NEXT ? idx + 1 : idx - 1;
      nextIdx = nextIdx >= activePlaylist.length ? nextIdx = activePlaylist.length - 1 : nextIdx;
      nextIdx = nextIdx < 0 ? 0 : nextIdx;
      nextTrackId = activePlaylist[nextIdx];
    }

    dispatch(changeSongAndPlay(nextTrackId));
  };
}

export function playNextSong() {
  return (dispatch) => {
    dispatch(playSongByAction(NEXT));
  };
}

export function playPrevSong() {
  return (dispatch) => {
    dispatch(playSongByAction(PREV));
  };
}

// When we click mode icons on player.
export function togglePlayMode(newMode) {
  return (dispatch, getState) => {
    const state = getState();
    const currMode = getPlayerMode(state);
    if (currMode === newMode) { /* Toggle off current mode, set to default mode */
      dispatch(changePlayMode(DEFAULT_MODE));
      if (newMode === SHUFFLE) dispatch(clearShufflePlaylist());
    } else { /* Toggle on new mode */
      dispatch(changePlayMode(newMode));
      if (newMode === SHUFFLE) {
        dispatch(shufflePlaylist());
      }
    }
  };
}


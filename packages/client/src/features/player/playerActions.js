import {
  shufflePlayQueue,
  updatePlayQueue,
  clearShuffleQueue,
} from '@soundnode-redux/client/src/features/playQueue/playQueueActions';
import { getPlayQueueByMode } from '@soundnode-redux/client/src/features/playQueue/playQueueSelectors';
import {
  getLastVolume,
  setLastVolume,
} from '@soundnode-redux/client/src/common/utils/localStorageUtils';
import { notificationWarning } from '@soundnode-redux/client/src/features/notification/notificationActions';
import * as playModes from './playerConsts';
import * as types from './playerActionTypes';
import * as selectors from './playerSelectors';

/* Action Creators */
export function beginSeek() {
  return { type: types.PLAYER_SEEK_BEGIN };
}

export function endSeek() {
  return { type: types.PLAYER_SEEK_END };
}

export function playSong() {
  return { type: types.PLAYER_SONG_PLAY };
}

export function loadSong() {
  return { type: types.PLAYER_SONG_LOAD };
}

export function pauseSong() {
  return { type: types.PLAYER_SONG_PAUSE };
}

export function beginVolumeSeek() {
  return { type: types.PLAYER_VOLUME_SEEK_BEGIN };
}

export function endVolumeSeek() {
  return { type: types.PLAYER_VOLUME_SEEK_END };
}

export function mute() {
  return { type: types.PLAYER_MUTE };
}

export function resetTime() {
  return { type: types.PLAYER_TIME_RESET };
}

export function updateActiveTrackId(trackId) {
  return {
    type: types.PLAYER_ACTIVE_TRACK_ID_UPDATE,
    payload: {
      activeTrackId: trackId,
    },
  };
}

export function removeActiveTrack() {
  return {
    type: types.PLAYER_ACTIVE_TRACK_REMOVE,
  };
}

export function updateTime(currentTime) {
  return {
    type: types.PLAYER_TIME_UPDATE,
    payload: {
      currentTime,
    },
  };
}

export function updateVolume(volume) {
  return {
    type: types.PLAYER_VOLUME_UPDATE,
    payload: {
      volume,
    },
  };
}

export function updatePlayMode(mode) {
  return {
    type: types.PLAYER_PLAY_MODE_UPDATE,
    payload: {
      mode,
    },
  };
}

/* Redux Thunks Domain Logic */
export function updateTimeIfNeeded(rawTime) {
  return (dispatch, getState) => {
    const state = getState();
    const newTime = rawTime;
    const currentTime = selectors.getCurrentTime(state);
    if (newTime !== currentTime) {
      dispatch(updateTime(newTime));
    }
  };
}

export function updateTimeOnPlay(time) {
  return (dispatch, getState) => {
    const state = getState();
    const seeking = selectors.isPlayerSeeking(state);
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
    dispatch(updateVolume(volume));
    dispatch(endVolumeSeek());
  };
}

export function toggleMute() {
  return (dispatch, getState) => {
    const state = getState();
    const currVolume = selectors.getCurrentVolume(state);
    if (currVolume === 0) {
      const lastVolume = getLastVolume();
      dispatch(updateVolume(lastVolume));
    } else {
      setLastVolume(currVolume);
      dispatch(mute());
    }
  };
}

export function resetPrevSong() {
  return (dispatch) => {
    dispatch(pauseSong());
    dispatch(resetTime());
  };
}

// Pause previous track, load new track into player, play new track.
export function loadTrackAndPlay(trackId) {
  return (dispatch) => {
    dispatch(resetPrevSong());
    dispatch(updateActiveTrackId(trackId));
    dispatch(loadSong());
  };
}

export function togglePlay() {
  return (dispatch, getState) => {
    const state = getState();
    const playing = selectors.isPlayerPlaying(state);
    if (playing) {
      dispatch(pauseSong());
    } else {
      dispatch(playSong());
    }
  };
}

export function togglePlaybackState(trackId, playlist) {
  return (dispatch, getState) => {
    const state = getState();
    const activeTrackId = selectors.getActiveTrackId(state);
    if (trackId === activeTrackId) {
      dispatch(togglePlay());
    } else {
      // update play queue title
      // dispatch(updatePlayQueue(playlist));
      dispatch(loadTrackAndPlay(trackId));
    }
  };
}

// When we click on next or prev.
// #FIXME: Needs rewrite too long
export function playSongByAction(actionType) {
  return (dispatch, getState) => {
    const state = getState();
    const mode = selectors.getPlayerMode(state);
    let nextTrackId = null;
    const curTrackId = selectors.getActiveTrackId(state);
    const playQueue = getPlayQueueByMode(state);
    if (mode === playModes.REPEAT) {
      nextTrackId = curTrackId;
    } else {
      const idx = playQueue.indexOf(curTrackId);
      let nextIdx = actionType === playModes.NEXT ? idx + 1 : idx - 1;
      // Last track
      if (nextIdx >= playQueue.length) {
        // Remove active track from player and stop playing
        dispatch(removeActiveTrack());
        // window.scrollTo(0, 0);
        return;
      }

      // First track
      nextIdx = nextIdx < 0 ? 0 : nextIdx;
      nextTrackId = playQueue[nextIdx];
    }
    dispatch(loadTrackAndPlay(nextTrackId));
  };
}

export function playNextSong() {
  return (dispatch) => {
    dispatch(playSongByAction(playModes.NEXT));
  };
}

export function playPrevSong() {
  return (dispatch) => {
    dispatch(playSongByAction(playModes.PREV));
  };
}

export function deactivatePlayer() {
  return (dispatch) => {
    dispatch();
  };
}

// When we click mode icons on player.
export function togglePlayMode(newMode) {
  return (dispatch, getState) => {
    const state = getState();
    const currMode = selectors.getPlayerMode(state);
    if (currMode === newMode) {
      /* Toggle off current mode, set to default mode */
      if (currMode === playModes.SHUFFLE) {
        dispatch(clearShuffleQueue());
      }
      dispatch(updatePlayMode(playModes.DEFAULT_MODE));
    } else {
      /* Toggle on new mode */
      dispatch(updatePlayMode(newMode));
      // Toggling on shuffle mode
      if (newMode === playModes.SHUFFLE) {
        dispatch(shufflePlayQueue());
      }
    }
  };
}

export function handleStreamError() {
  return (dispatch) => {
    dispatch(notificationWarning('Track not streamable'));
    dispatch(playNextSong());
  };
}

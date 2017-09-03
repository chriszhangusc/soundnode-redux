import {
  clearShufflePlaylist,
  shufflePlayQueue,
  switchActivePlayQueueIfNeeded,
} from 'features/playQueue/playQueueActions';
import { getPlayQueueByMode } from 'features/playQueue/playQueueSelectors';
import { getLastVolume, setLastVolume } from 'common/utils/localStorageUtils';
import * as types from './playerActionTypes';
import {
  isPlayerPlaying,
  isPlayerSeeking,
  getCurrentTime,
  getCurrentVolume,
  getCurrentPlayerTrack,
  getActiveTrackId,
  getPlayerMode,
} from './playerSelectors';

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

export function changePlayMode(mode) {
  return {
    type: types.PLAYER_PLAY_MODE_CHANGE,
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
    dispatch(updateVolume(volume));
    dispatch(endVolumeSeek());
  };
}

export function toggleMute() {
  return (dispatch, getState) => {
    const state = getState();
    const currVolume = getCurrentVolume(state);
    if (currVolume === 0) {
      const lastVolume = getLastVolume();
      dispatch(updateVolume(lastVolume));
    } else {
      setLastVolume(currVolume);
      dispatch(mute());
    }
  };
}

// Change to new song or just play paused current song.
export function updateActiveTrackIdAndPlay(newTrackId) {
  return (dispatch, getState) => {
    const state = getState();
    const curTrackId = getCurrentPlayerTrack(state);
    dispatch(pauseSong());
    dispatch(resetTime());
    if (curTrackId !== newTrackId) {
      dispatch(updateActiveTrackId(newTrackId));
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
    const curTrackId = getActiveTrackId(state);
    const activePlaylist = getPlayQueueByMode(state);
    if (mode === types.REPEAT) {
      nextTrackId = curTrackId;
    } else {
      const idx = activePlaylist.indexOf(curTrackId);
      let nextIdx = actionType === types.NEXT ? idx + 1 : idx - 1;
      nextIdx = nextIdx >= activePlaylist.length ? (nextIdx = activePlaylist.length - 1) : nextIdx;
      nextIdx = nextIdx < 0 ? 0 : nextIdx;
      nextTrackId = activePlaylist[nextIdx];
    }

    dispatch(updateActiveTrackIdAndPlay(nextTrackId));
  };
}

export function playNextSong() {
  return (dispatch) => {
    dispatch(playSongByAction(types.NEXT));
  };
}

export function playPrevSong() {
  return (dispatch) => {
    dispatch(playSongByAction(types.PREV));
  };
}

export function togglePlay() {
  return (dispatch, getState) => {
    const state = getState();
    const playing = isPlayerPlaying(state);
    if (playing) {
      dispatch(pauseSong());
    } else {
      dispatch(playSong());
    }
  };
}

// When we click mode icons on player.
export function togglePlayMode(newMode) {
  return (dispatch, getState) => {
    const state = getState();
    const currMode = getPlayerMode(state);
    if (currMode === newMode) {
      /* Toggle off current mode, set to default mode */
      dispatch(changePlayMode(types.DEFAULT_MODE));
      if (newMode === types.SHUFFLE) dispatch(clearShufflePlaylist());
    } else {
      /* Toggle on new mode */
      dispatch(changePlayMode(newMode));
      if (newMode === types.SHUFFLE) {
        dispatch(shufflePlayQueue());
      }
    }
  };
}

export function togglePlaybackState(trackId) {
  return (dispatch, getState) => {
    const state = getState();
    const activeTrackId = getActiveTrackId(state);
    if (trackId === activeTrackId) {
      dispatch(togglePlay());
    } else {
      dispatch(switchActivePlayQueueIfNeeded());
      dispatch(updateActiveTrackIdAndPlay(trackId));
    }
  };
}


// export function togglePlaybackStateAndSwitchPlaylist() {
//   return (dispatch) => {
//     dispatch(togglePlaybackState());
//     dispatch(switchPlaylistIfNeeded());
//   };
// }

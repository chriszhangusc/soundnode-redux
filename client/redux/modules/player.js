import { getTrackById } from 'client/redux/modules/entities';
import { getLastVolume, setLastVolume } from 'client/utils/LocalStorageUtils';

// Relies heavily on playlist module
import {
  shufflePlaylist,
  clearShufflePlaylist,
  getActivePlaylist,
} from 'client/redux/modules/playlist';

import { CLEAR_PLAY_QUEUE } from './playlist';

/* Constants */
export const LOOP = 'LOOP'; // Loop through the playlist, when it hits the end, start all over from the beginning
export const REPEAT = 'REPEAT'; // Repeat current song.
export const SHUFFLE = 'SHUFFLE'; // Shuffle playing, will not play songs that are played already.
export const DEFAULT_MODE = LOOP;
export const INITIAL_VOLUME = 0.5;
export const NEXT = 'NEXT';
export const PREV = 'PREV';

/* Player Action Types */
export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const UPDATE_TIME = 'UPDATE_TIME';
export const LOAD_PLAYER_PLAYLIST = 'LOAD_PLAYER_PLAYLIST';
export const CHANGE_SONG = 'CHANGE_SONG';
export const BEGIN_SEEK = 'BEGIN_SEEK';
export const END_SEEK = 'END_SEEK';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const BEGIN_VOLUME_SEEK = 'BEGIN_VOLUME_SEEK';
export const END_VOLUME_SEEK = 'END_VOLUME_SEEK';
export const CHANGE_PLAY_MODE = 'CHANGE_PLAY_MODE';
export const CHANGE_VISIBLE_PLAYLIST = 'CHANGE_VISIBLE_PLAYLIST';
export const MUTE = 'MUTE';
export const CLEAR_TIME = 'CLEAR_TIME';
export const SEARCH_SONGS = 'SEARCH_SONGS';

/* Player Reducer */
const initialState = {
  currentTime: 0,
  volume: INITIAL_VOLUME,
  trackId: undefined,
  playing: false,
  seeking: false,
  volumeSeeking: false,
  duration: 0,
  mode: DEFAULT_MODE,
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_SONG:
      return {
        ...state,
        playing: true,
      };

    case PAUSE_SONG:
      return {
        ...state,
        playing: false,
      };

    case CHANGE_SONG:
      return {
        ...state,
        trackId: action.payload,
      };

    case UPDATE_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };

    case BEGIN_SEEK:
      return {
        ...state,
        seeking: true,
      };

    case END_SEEK:
      return {
        ...state,
        seeking: false,
      };

    case CHANGE_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };

    case BEGIN_VOLUME_SEEK:
      return {
        ...state,
        volumeSeeking: true,
      };

    case END_VOLUME_SEEK:
      return {
        ...state,
        volumeSeeking: false,
      };

    case CHANGE_PLAY_MODE:
      return {
        ...state,
        mode: action.payload,
      };

    case MUTE:
      return {
        ...state,
        volume: 0,
      };

    case CLEAR_TIME:
      return {
        ...state,
        currentTime: 0,
      };

    // What?
    case CLEAR_PLAY_QUEUE:
      return initialState;

    default:
      return state;
  }
}


/* Selectors */
export const getPlayerState = state => state.player;
export const getPlayerTrackId = state => getPlayerState(state).trackId;
export const isPlayerPlaying = state => getPlayerState(state).playing;
export const isPlayerSeeking = state => getPlayerState(state).seeking;
export const getCurrentTime = state => getPlayerState(state).currentTime;
export const getPlayerMode = state => getPlayerState(state).mode;
export const isVolumeSeeking = state => getPlayerState(state).volumeSeeking;
export const getCurrentVolume = state => getPlayerState(state).volume;

/* Return if the current track(byId) is loaded in player. (Paused or Playing) */
export function isTrackActive(state, trackId) {
  const playerTrackId = getPlayerTrackId(state);
  if (playerTrackId && trackId) {
    return playerTrackId.toString() === trackId.toString();
  }
  return false;
}

export const isTrackPlaying = (state, id) => isTrackActive(state, id) && isPlayerPlaying(state);

export const isInShuffleMode = state => getPlayerState(state).mode === SHUFFLE;

// (Reselect) Return the current player track (Immutable.Record)
export function getCurrentPlayerTrack(state) {
  const trackId = getPlayerTrackId(state);
  return getTrackById(state, trackId);
}

/* Action Creators */
export const beginSeek = () => ({ type: BEGIN_SEEK });

export const endSeek = () => ({ type: END_SEEK });

export const playSong = () => ({ type: PLAY_SONG });

export const pauseSong = () => ({ type: PAUSE_SONG });

export const beginVolumeSeek = () => ({ type: BEGIN_VOLUME_SEEK });

export const endVolumeSeek = () => ({ type: END_VOLUME_SEEK });

export const mute = () => ({ type: MUTE });

export const clearTime = () => ({ type: CLEAR_TIME });

export const updateTime = currentTime => ({
  type: UPDATE_TIME,
  payload: currentTime,
});

export const changeSong = trackId => ({
  type: CHANGE_SONG,
  payload: trackId,
});

export const changeVolume = volume => ({
  type: CHANGE_VOLUME,
  payload: volume,
});

export const changePlayMode = mode => ({
  type: CHANGE_PLAY_MODE,
  payload: mode,
});

/* Redux Thunks */
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

// When we click play on the song card.
export function playSongByMode(trackId) {
  return (dispatch, getState) => {
    const state = getState();
    const inShuffleMode = isInShuffleMode(state);
    if (inShuffleMode) {
      shufflePlaylist();
    }
    dispatch(changeSongAndPlay(trackId));
  };
}

// When we click on next or prev.
export function playSongByAction(actionType = NEXT) {
  return (dispatch, getState) => {
    const state = getState();
    const mode = getPlayerMode(state);
    let nextTrackId = null;
    const curTrackId = getPlayerTrackId(state);
    const activePlaylist = getActivePlaylist(state);
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
    if (currMode === newMode) {
      if (currMode === SHUFFLE) dispatch(clearShufflePlaylist());
      dispatch(changePlayMode(DEFAULT_MODE));
    } else {
      if (newMode === SHUFFLE) dispatch(shufflePlaylist());
      dispatch(changePlayMode(newMode));
    }
  };
}


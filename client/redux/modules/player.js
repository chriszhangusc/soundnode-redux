import { getTrackById } from 'client/redux/modules/entities';
import { getLastVolume, setLastVolume } from 'client/utils/LocalStorageUtils';
// This piece of logic belongs here!!
import { getTrackIdByMode } from 'client/utils/SongUtils';

// Relies heavily on playlist module
import {
  getPlaylistTrackIds,
  initPlaylistIfNeeded,
  addToPlayQueueIfNeeded,
  getShuffleDraw,
  shuffleDraw,
  shuffleDiscard,
  reshuffle,
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

/* Player Saga Action Types*/
// export const SAGA_CHANGE_SONG_AND_PLAY = 'SAGA_CHANGE_SONG_AND_PLAY';
// export const SAGA_UPDATE_TIME_ON_PLAY = 'SAGA_UPDATE_TIME_ON_PLAY';
// export const SAGA_UPDATE_TIME_ON_SEEK = 'SAGA_UPDATE_TIME_ON_SEEK';
// export const SAGA_UPDATE_TIME_AND_END_SEEK = 'SAGA_UPDATE_TIME_AND_END_SEEK';
// export const SAGA_UPDATE_VOLUME_AND_END_SEEK = 'SAGA_UPDATE_VOLUME_AND_END_SEEK';
// export const SAGA_PLAY_NEXT_SONG = 'SAGA_PLAY_NEXT_SONG';
// export const SAGA_PLAY_PREV_SONG = 'SAGA_PLAY_PREV_SONG';
// export const SAGA_CHANGE_PLAY_MODE = 'SAGA_CHANGE_PLAY_MODE';

// export const SAGA_TOGGLE_MUTE = 'SAGA_TOGGLE_MUTE';
export const MUTE = 'MUTE';
export const CLEAR_TIME = 'CLEAR_TIME';
export const SEARCH_SONGS = 'SEARCH_SONGS';
export const INIT_SHUFFLE = 'INIT_SHUFFLE';
export const SHUFFLE_DRAW = 'SHUFFLE_DRAW';
export const SHUFFLE_DISCARD = 'SHUFFLE_DISCARD';

/* Pure actions */


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

/**
 * Change the current song to newSong.
 * @param  {Track(Record)} newSong The Track Record model.
 * @return {Object} Action
 */
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

// Saga Actions (Actions that will trigger a saga and execute side effects)
// Player logic are implemented in sagas
// export const sagaToggleMute = () => ({
//   type: SAGA_TOGGLE_MUTE,
// });

// export const sagaChangeSongAndPlay = (trackId, playlist) => ({
//   type: SAGA_CHANGE_SONG_AND_PLAY,
//   payload: {
//     trackId,
//     playlist,
//   },
// });

// export const sagaChangePlayMode = mode => ({
//   type: SAGA_CHANGE_PLAY_MODE,
//   payload: mode,
// });

// export const sagaPlayNextSong = () => ({
//   type: SAGA_PLAY_NEXT_SONG,
// });

// export const sagaPlayPrevSong = () => ({
//   type: SAGA_PLAY_PREV_SONG,
// });

// export const sagaUpdateTimeOnPlay = newTime => ({
//   type: SAGA_UPDATE_TIME_ON_PLAY,
//   payload: newTime,
// });

// export const sagaUpdateTimeOnSeek = newTime => ({
//   type: SAGA_UPDATE_TIME_ON_SEEK,
//   payload: newTime,
// });

// export const sagaUpdateTimeAndEndSeek = newTime => ({
//   type: SAGA_UPDATE_TIME_AND_END_SEEK,
//   payload: newTime,
// });

// export const sagaUpdateVolumeAndEndSeek = newVolume => ({
//   type: SAGA_UPDATE_VOLUME_AND_END_SEEK,
//   payload: newVolume,
// });



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

// (Reselect) Return the current player track (Immutable.Record)
export function getCurrentPlayerTrack(state) {
  const trackId = getPlayerTrackId(state);
  return getTrackById(state, trackId);
}

/**
 * Return if the current track(byId) is loaded in player. (Paused or Playing)
 * @param  {[type]} state [description]
 * @param  {[type]} id    [description]
 * @return {[type]}       [description]
 */
export function isTrackActive(state, trackId) {
  const playerTrackId = getPlayerTrackId(state);
  if (playerTrackId && trackId) {
    return playerTrackId.toString() === trackId.toString();
  }
  return false;
}

/* Thunks */
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
export function changeSongAndPlay(trackId, playlist) {
  return (dispatch) => {
    if (playlist) {
      dispatch(initPlaylistIfNeeded(playlist));
    } else {
      dispatch(addToPlayQueueIfNeeded(trackId));
    }
    dispatch(pauseSong());
    dispatch(clearTime());
    // Change current track to new track.
    dispatch(changeSong(trackId));
    dispatch(playSong());
  };
}

function shuffle() {
  // // Always keep in mind that we are dealing with immutable objects.
  // const shuffleDrawQueue = yield select(getShuffleDraw);
  // // Generate the array index of the song we are going to play next
  // const nextIdx = yield call(generateRandom, 0, shuffleDrawQueue.size - 1);
  // const nextTrackId = shuffleDrawQueue.get(nextIdx);
  // console.log(nextTrackId);
  // // Remove nextSongId from shuffleDraw and add it to shuffleDiscard queue

  // // Passing idx makes deleting easier
  // yield put(shuffleDraw(nextIdx));
  // yield put(shuffleDiscard(nextTrackId));
  // // // Reshuffle if all cards are played once.
  // if ((yield select(getShuffleDraw)).size === 0) {
  //   yield put(reshuffle());
  // }
  // return nextTrackId;
  return null;
}

// action being NEXT or PREV, passed in watch function.
export function doPlaySongByMode(action) {
  return (dispatch, getState) => {
    const state = getState();
    const mode = getPlayerMode(state);
    const playerTrackId = getPlayerTrackId(state);
    let nextTrackId = null;
    if (mode === SHUFFLE) {
      nextTrackId = shuffle();
    } else {
      const playlist = getPlaylistTrackIds(state);
      nextTrackId = getTrackIdByMode(playerTrackId, playlist, mode, action);
    }
    dispatch(changeSongAndPlay(nextTrackId));
  };
}

export function playNextSong() {
  return doPlaySongByMode(NEXT);
}

export function playPrevSong() {
  return doPlaySongByMode(PREV);
}

export function toggleOrChangePlayMode(newMode) {
  return (dispatch, getState) => {
    const state = getState();
    const currMode = getPlayerMode(state);
    if (currMode === newMode) {
      dispatch(changePlayMode(DEFAULT_MODE));
    } else {
      dispatch(changePlayMode(newMode));
    }
  };
}



export const isTrackPlaying = (state, id) => isTrackActive(state, id) && isPlayerPlaying(state);

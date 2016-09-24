import { put, call, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import * as ActionTypes from '../constants/ActionTypes';
import { getLastVolume, setLastVolume } from '../utils/LocalStorageUtils';
import actions from '../actions';
import * as selectors from '../reducers';

import { SHUFFLE, NEXT, PREV, DEFAULT_MODE } from '../constants/PlayerConstants';
import { getSongIdByMode } from '../utils/SongUtils';
import { generateRandom } from '../utils/GeneralUtils';
/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/

function* convertAndUpdateTime(rawTime) {
  const newTime = yield call(Math.floor, rawTime); // Convert float to int
  const currentTime = yield select(selectors.getCurrentTime);
  if (newTime !== currentTime) {
    yield put(actions.updateTime(newTime));
  }
}

function* updateTimeRegular({ payload }) {
  const isSeeking = yield select(selectors.getSeekState);
  if (!isSeeking) {
    yield call(convertAndUpdateTime, payload);
  }
}

function* updateTimeSeek({ payload }) {
  yield call(convertAndUpdateTime, payload);
}

function* updateTimeAndEndSeek({ payload }) {
  yield call(convertAndUpdateTime, payload);
  yield put(actions.endSeek());
}

function* updateVolumeAndEndSeek({ payload }) {
  yield put(actions.changeVolume(payload));
  yield put(actions.endVolumeSeek());
}

function* toggleMute() {
  const currVolume = yield select(selectors.getCurrentVolume);
  if (currVolume === 0) {
    const lastVolume = yield call(getLastVolume);
    yield put(actions.changeVolume(lastVolume));
  } else {
    yield call(setLastVolume, currVolume);
    yield put(actions.mute());
  }
}

// Change to new song or just play paused current song.
function* changeSongAndPlay({ payload }) {
  const newSongId = payload;
  const visiblePlaylistName = yield select(selectors.getVisiblePlaylistName);
  const playerPlaylistName = yield select(selectors.getPlayerPlaylistName);
  if (visiblePlaylistName !== playerPlaylistName) {
    yield put(actions.loadPlayerPlaylist(visiblePlaylistName));
  }
  yield put(actions.pauseSong());
  yield put(actions.changeSong(newSongId));
  yield put(actions.clearTime());
  yield put(actions.playSong());
}

function* shuffle() {
  const shuffleDraw = yield select(selectors.getShuffleDraw);
  // Generate the array index of the song we are going to play next
  const nextIdx = yield call(generateRandom, 0, shuffleDraw.length - 1);
  const nextSongId = shuffleDraw[nextIdx];
  // Remove nextSongId from shuffleDraw
  yield put(actions.shuffleDraw(nextSongId));
  // Add nextSongId to shuffleDiscard
  yield put(actions.shuffleDiscard(nextSongId));
  // Reshuffle if all cards are played once.
  if ((yield select(selectors.getShuffleDraw)).length === 0) {
    const visibleSongIds = yield select(selectors.getVisibleSongIds);
    yield put(actions.initShuffle(visibleSongIds));
  }
  return nextSongId;
}

// action being NEXT or PREV
function* playSong(action) {
  const mode = yield select(selectors.getPlayerMode);
  const currentSongId = yield select(selectors.getCurrentSongId);
  let playlistSongIds = null;
  let nextSongId = null;
  if (mode === SHUFFLE) {
    nextSongId = yield call(shuffle);
  } else {
    playlistSongIds = yield select(selectors.getPlayerSongIds);
    nextSongId = yield call(getSongIdByMode, currentSongId, playlistSongIds, mode, action);
  }
  yield put(actions.changeSongAndPlay(nextSongId));
}

function* changePlayMode({ payload }) {
  const currMode = yield select(selectors.getPlayerMode);
  const newMode = payload;
  if (currMode === newMode) {
    // Toggle off
    yield put(actions.switchMode(DEFAULT_MODE));
  } else {
    // Toggle On
    if (newMode === SHUFFLE) {
      const shuffleInitialized = yield select(selectors.shuffleInitialized);
      // Init shuffle with current visible playlist / Or should we use player playist?
      if (!shuffleInitialized) {
        const visibleSongIds = yield select(selectors.getVisibleSongIds);
        yield put(actions.initShuffle(visibleSongIds));
      }
    }
    // Set up two sets for shuffle
    yield put(actions.switchMode(newMode));
  }
}

/* *****************************************************************************/
/* ****************************** WATCHERS *************************************/
/* *****************************************************************************/

export function* watchRegularTimeUpdate() {
  yield takeEvery(ActionTypes.UPDATE_TIME_ON_PLAY, updateTimeRegular);
}

export function* watchSeekTimeUpdate() {
  yield takeEvery(ActionTypes.UPDATE_TIME_ON_SEEK, updateTimeSeek);
}

export function* watchEndSeekTime() {
  yield takeEvery(ActionTypes.UPDATE_TIME_AND_END_SEEK, updateTimeAndEndSeek);
}

export function* watchEndSeekVolume() {
  yield takeEvery(ActionTypes.UPDATE_VOLUME_AND_END_SEEK, updateVolumeAndEndSeek);
}

export function* watchToggleMute() {
  yield takeEvery(ActionTypes.TOGGLE_MUTE, toggleMute);
}

export function* watchPlayNextSong() {
  yield takeEvery(ActionTypes.PLAY_NEXT_SONG, playSong, NEXT);
}

export function* watchPlayPrevSong() {
  yield takeEvery(ActionTypes.PLAY_PREV_SONG, playSong, PREV);
}

export function* watchChangePlayMode() {
  yield takeEvery(ActionTypes.CHANGE_PLAY_MODE, changePlayMode);
}

export function* watchChangeSongAndPlay() {
  yield takeEvery(ActionTypes.CHANGE_SONG_AND_PLAY, changeSongAndPlay);
}

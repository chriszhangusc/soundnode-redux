import { put, call, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import * as ActionTypes from '../constants/ActionTypes';
import { getLastVolume, setLastVolume } from '../utils/LocalStorageUtils';
import { updateTime, endSeek, changeVolume, endVolumeSeek, switchMode } from '../actions/player';
import { changeSongAndPlay } from '../actions';
import {
  getCurrentTime,
  getSeekState,
  getCurrentVolume,
  getPlayerSongIds,
  getCurrentSongId,
  getPlayerMode
} from '../reducers';

import { NEXT, PREV, DEFAULT_MODE } from '../constants/PlayerConstants';
import { getSongIdByMode } from '../utils/SongUtils';

/******************************************************************************/
/******************************* SUBROUTINES **********************************/
/******************************************************************************/

function* convertAndUpdateTime(rawTime) {
  const newTime = yield call(Math.floor, rawTime); // Convert float to int
  const currentTime = yield select(getCurrentTime);
  if (newTime !== currentTime) {
    yield put(updateTime(newTime));
  }
}


function* updateTimeRegular({ payload }) {
  const isSeeking = yield select(getSeekState);
  if (!isSeeking) {
      yield call(convertAndUpdateTime, payload);
  }
}


function* updateTimeSeek({ payload }) {
  yield call(convertAndUpdateTime,payload);
}

function* updateTimeAndEndSeek({ payload }) {
  yield call(convertAndUpdateTime, payload);
  yield put(endSeek());
}

function* updateVolumeAndEndSeek({ payload }) {
  yield put(changeVolume(payload));
  yield put(endVolumeSeek());
}

function* toggleMute() {
  const currVolume = yield select(getCurrentVolume);
  if (currVolume === 0) {
    const lastVolume = yield call(getLastVolume);
    yield put(changeVolume(lastVolume));
  } else {
    yield call(setLastVolume, currVolume);
    yield put(changeVolume(0));
  }
}
// action being NEXT or PREV
function* playSong(action) {
  const mode = yield select(getPlayerMode);
  const playlistSongIds = yield select(getPlayerSongIds);
  const currentSongId = yield select(getCurrentSongId);
  const nextSongId = yield call(getSongIdByMode, currentSongId, playlistSongIds, mode, action);
  yield put(changeSongAndPlay(nextSongId));
}

function* changePlayMode({ payload }) {
  const currMode = yield select(getPlayerMode);
  const newMode = payload;
  if (currMode === newMode) {
    // Toggle off
    yield put(switchMode(DEFAULT_MODE));
  } else {
    // Toggle On
    yield put(switchMode(newMode));
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

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

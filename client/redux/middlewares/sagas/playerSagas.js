import { put, call, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { getLastVolume, setLastVolume } from 'client/utils/LocalStorageUtils';
import { getTrackIdByMode } from 'client/utils/SongUtils';
import { generateRandom } from 'client/utils/GeneralUtils';
import {
  getPlaylistTrackIds,
  initPlaylistIfNeeded,
  addToPlayQueueIfNeeded,
  getShuffleDraw,
  shuffleDraw,
  shuffleDiscard,
  reshuffle,
} from 'client/redux/modules/playlist';
// Not good
import * as playerDuck from 'client/redux/modules/player';
/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/

function* updateTimeIfNeeded(rawTime) {
  const newTime = yield call(Math.floor, rawTime); // Convert float to int
  const currentTime = yield select(playerDuck.getCurrentTime);
  if (newTime !== currentTime) {
    yield put(playerDuck.updateTime(newTime));
  }
}

function* updateTimeRegular({ payload }) {
  const seeking = yield select(playerDuck.isPlayerSeeking);
  if (!seeking) {
    yield call(updateTimeIfNeeded, payload);
  }
}

function* updateTimeSeek({ payload }) {
  yield call(updateTimeIfNeeded, payload);
}

function* updateTimeAndEndSeek({ payload }) {
  yield call(updateTimeIfNeeded, payload);
  yield put(playerDuck.endSeek());
}

function* updateVolumeAndEndSeek({ payload }) {
  yield put(playerDuck.changeVolume(payload));
  yield put(playerDuck.endVolumeSeek());
}

function* toggleMute() {
  const currVolume = yield select(playerDuck.getCurrentVolume);
  if (currVolume === 0) {
    const lastVolume = yield call(getLastVolume);
    yield put(playerDuck.changeVolume(lastVolume));
  } else {
    yield call(setLastVolume, currVolume);
    yield put(playerDuck.mute());
  }
}

// Change to new song or just play paused current song.
function* changeSongAndPlay({ payload }) {
  // Check if we need to load current list of tracks into the play queue.
  const { trackId, playlist } = payload;
  if (playlist) {
    yield put(initPlaylistIfNeeded(playlist));
  } else {
    yield put(addToPlayQueueIfNeeded(trackId));
  }
  yield put(playerDuck.pauseSong());
  yield put(playerDuck.clearTime());
  // Change current track to new track.
  yield put(playerDuck.changeSong(trackId));
  yield put(playerDuck.playSong());
}

function* shuffle() {
  // Always keep in mind that we are dealing with immutable objects.
  const shuffleDrawQueue = yield select(getShuffleDraw);
  // Generate the array index of the song we are going to play next
  const nextIdx = yield call(generateRandom, 0, shuffleDrawQueue.size - 1);
  const nextTrackId = shuffleDrawQueue.get(nextIdx);
  console.log(nextTrackId);
  // Remove nextSongId from shuffleDraw and add it to shuffleDiscard queue

  // Passing idx makes deleting easier
  yield put(shuffleDraw(nextIdx));
  yield put(shuffleDiscard(nextTrackId));
  // // Reshuffle if all cards are played once.
  if ((yield select(getShuffleDraw)).size === 0) {
    yield put(reshuffle());
  }
  return nextTrackId;
}

// action being NEXT or PREV, passed in watch function.
function* doPlaySongByMode(action) {
  const mode = yield select(playerDuck.getPlayerMode);
  const playerTrackId = yield select(playerDuck.getPlayerTrackId);
  let nextTrackId = null;
  if (mode === playerDuck.SHUFFLE) {
    nextTrackId = yield call(shuffle);
  } else {
    const playlist = yield select(getPlaylistTrackIds);
    nextTrackId = yield call(getTrackIdByMode, playerTrackId, playlist.toJS(), mode, action);
  }

  yield put(playerDuck.sagaChangeSongAndPlay(nextTrackId));
}

function* doChangePlayMode({ payload }) {
  const currMode = yield select(playerDuck.getPlayerMode);
  const newMode = payload;
  if (currMode === newMode) {
    // Toggle off
    yield put(playerDuck.changePlayMode(playerDuck.DEFAULT_MODE));
  } else {
    // Set up two sets for shuffle
    yield put(playerDuck.changePlayMode(newMode));
  }
}

/* *****************************************************************************/
/* ****************************** WATCHERS *************************************/
/* *****************************************************************************/

export function* watchRegularTimeUpdate() {
  yield takeEvery(playerDuck.SAGA_UPDATE_TIME_ON_PLAY, updateTimeRegular);
}

export function* watchSeekTimeUpdate() {
  yield takeEvery(playerDuck.SAGA_UPDATE_TIME_ON_SEEK, updateTimeSeek);
}

export function* watchEndSeekTime() {
  yield takeEvery(playerDuck.SAGA_UPDATE_TIME_AND_END_SEEK, updateTimeAndEndSeek);
}

export function* watchEndSeekVolume() {
  yield takeEvery(playerDuck.SAGA_UPDATE_VOLUME_AND_END_SEEK, updateVolumeAndEndSeek);
}

export function* watchChangePlayMode() {
  yield takeEvery(playerDuck.SAGA_CHANGE_PLAY_MODE, doChangePlayMode);
}

export function* watchChangeSongAndPlay() {
  yield takeEvery(playerDuck.SAGA_CHANGE_SONG_AND_PLAY, changeSongAndPlay);
}

export function* watchToggleMute() {
  yield takeEvery(playerDuck.SAGA_TOGGLE_MUTE, toggleMute);
}

export function* watchPlayNextSong() {
  yield takeEvery(playerDuck.SAGA_PLAY_NEXT_SONG, doPlaySongByMode, playerDuck.NEXT);
}

export function* watchPlayPrevSong() {
  yield takeEvery(playerDuck.SAGA_PLAY_PREV_SONG, doPlaySongByMode, playerDuck.PREV);
}

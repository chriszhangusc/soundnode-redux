import { put, call, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { getLastVolume, setLastVolume } from 'client/utils/LocalStorageUtils';
import { getSongIdByMode } from 'client/utils/SongUtils';
import { generateRandom } from 'client/utils/GeneralUtils';
// import {
//   updateTime,
//   endSeek,
//   changeVolume,
//   endVolumeSeek,
//   mute,
//   loadPlayerPlaylist,
//   pauseSong,
//   changeSong,
//   clearTime,
//   playSong,
//   initShuffle,
//   sagaChangeSongAndPlay,
//   changePlayMode,
//   shuffleDraw,
//   shuffleDiscard
// }  from 'client/redux/modules/player';
import * as playerDuck from 'client/redux/modules/player';
/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/

function* convertAndUpdateTime(rawTime) {
  const newTime = yield call(Math.floor, rawTime); // Convert float to int
  const currentTime = yield select(playerDuck.getCurrentTime);
  if (newTime !== currentTime) {
    yield put(playerDuck.updateTime(newTime));
  }
}

function* updateTimeRegular({ payload }) {
  const seeking = yield select(playerDuck.isPlayerSeeking);
  if (!seeking) {
    yield call(convertAndUpdateTime, payload);
  }
}

function* updateTimeSeek({ payload }) {
  yield call(convertAndUpdateTime, payload);
}

function* updateTimeAndEndSeek({ payload }) {
  yield call(convertAndUpdateTime, payload);
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
  const newSong = payload;
  const visiblePlaylistName = yield select(playerDuck.getVisiblePlaylistName);
  const playerPlaylistName = yield select(playerDuck.getPlayerPlaylistName);
  if (visiblePlaylistName !== playerPlaylistName) {
    yield put(playerDuck.loadPlayerPlaylist(visiblePlaylistName));
  }
  yield put(playerDuck.pauseSong());
  yield put(playerDuck.changeSong(newSong));
  yield put(playerDuck.clearTime());
  yield put(playerDuck.playSong());
}

function* shuffle() {
  const shuffleDrawQueue = yield select(playerDuck.getShuffleDraw);
  // Generate the array index of the song we are going to play next
  const nextIdx = yield call(generateRandom, 0, shuffleDrawQueue.length - 1);
  const nextSongId = shuffleDrawQueue[nextIdx];
  // Remove nextSongId from shuffleDraw
  yield put(playerDuck.shuffleDraw(nextSongId));
  // Add nextSongId to shuffleDiscard
  yield put(playerDuck.shuffleDiscard(nextSongId));
  // Reshuffle if all cards are played once.
  if ((yield select(playerDuck.getShuffleDraw)).length === 0) {
    const visibleSongIds = yield select(playerDuck.getVisibleSongIds);
    yield put(playerDuck.initShuffle(visibleSongIds));
  }
  return nextSongId;
}

// action being NEXT or PREV
function* doPlaySong(action) {
  const mode = yield select(playerDuck.getPlayerMode);
  const currentSongId = yield select(playerDuck.getCurrentSongId);
  let playlistSongIds = null;
  let nextSongId = null;
  if (mode === playerDuck.SHUFFLE) {
    nextSongId = yield call(shuffle);
  } else {
    playlistSongIds = yield select(playerDuck.getPlayerSongIds);
    nextSongId = yield call(getSongIdByMode, currentSongId, playlistSongIds, mode, action);
  }

  const nextSong = yield select(playerDuck.getSongByIdFromPlaylist, nextSongId);
  yield put(playerDuck.sagaChangeSongAndPlay(nextSong));
}

function* doChangePlayMode({ payload }) {
  const currMode = yield select(playerDuck.getPlayerMode);
  const newMode = payload;
  if (currMode === newMode) {
    // Toggle off
    yield put(playerDuck.changePlayMode(playerDuck.DEFAULT_MODE));
  } else {
    // Toggle On
    if (newMode === playerDuck.SHUFFLE) {
      const shuffleInitialized = yield select(playerDuck.shuffleInitialized);
      // Init shuffle with current visible playlist / Or should we use player playist?
      if (!shuffleInitialized) {
        const visibleSongIds = yield select(playerDuck.getVisibleSongIds);
        yield put(playerDuck.initShuffle(visibleSongIds));
      }
    }
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
  yield takeEvery(playerDuck.SAGA_PLAY_NEXT_SONG, doPlaySong, playerDuck.NEXT);
}

export function* watchPlayPrevSong() {
  yield takeEvery(playerDuck.SAGA_PLAY_PREV_SONG, doPlaySong, playerDuck.PREV);
}

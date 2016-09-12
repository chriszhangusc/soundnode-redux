import {createSelector} from 'reselect';
import {generateStreamUrl} from '../utils/SongUtils';
import * as fromReducers from '../reducers';

/* Composed memoized selectors for PlayerContainer */
export const getPlayingState = createSelector(
  [fromReducers.getPlayingState],
  isPlaying => isPlaying
);

export const getCurrentSong = createSelector(
  [fromReducers.getSongMap, fromReducers.getCurrentSongId],
  (songsById, songId) => {
    if (songId) return songsById[songId];
    return null;
  }
);

export const getDuration = createSelector(
  [getCurrentSong],
  currentSong => currentSong ? currentSong.duration / 1000.0 : null
);

export const getStreamUrl = createSelector(
  [getCurrentSong],
  currentSong => generateStreamUrl(currentSong)
);

export const getCurrentTime = createSelector(
  [fromReducers.getCurrentTime],
  currentTime => currentTime
);

export const getSeekStatus = createSelector(
  [fromReducers.getSeekStatus],
  seekStatus => seekStatus
);

export const getCurrentVolume = createSelector(
  [fromReducers.getCurrentVolume],
  volume => volume
);

export const getVolumeSeekState = createSelector(
  [fromReducers.getVolumeSeekState],
  volumeIsSeeking => volumeIsSeeking
);

// Data needed to be prepared for PlayerContainer
// isPlaying: getPlayingState(state),
// duration: getDuration(state),
// currentSong: getCurrentSong(state),
// streamUrl: getStreamUrl(state),
// currentTime: getCurrentTime(state),
// isSeeking: getSeekStatus(state),
// volume: getCurrentVolume(state),
// volumeIsSeeking: getVolumeSeekState(state),

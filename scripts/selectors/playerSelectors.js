import { createSelector } from 'reselect';
import { formatStreamUrl } from '../utils/SongUtils';
import * as fromReducers from '../modules/reducers';

/* Composed memoized selectors for PlayerContainer */
export const getPlayingState = createSelector(
  [fromReducers.getPlayingState],
  isPlaying => isPlaying
);

export const getCurrentSongId = createSelector(
  [fromReducers.getCurrentSongId],
  songId => songId
);

export const getCurrentSong = createSelector(
  [fromReducers.getCurrentSong],
  song => song
);

export const getDuration = createSelector(
  [getCurrentSong],
  currentSong => (currentSong ? currentSong.duration / 1000.0 : null)
);

export const getStreamUrl = createSelector(
  [getCurrentSong],
  currentSong => (currentSong ? formatStreamUrl(currentSong.uri) : null)
);

export const getCurrentTime = createSelector(
  [fromReducers.getCurrentTime],
  currentTime => currentTime
);

export const getSeekState = createSelector(
  [fromReducers.getSeekState],
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

export const getCurrentSongTitle = createSelector(
  [getCurrentSong],
  currentSong => (currentSong ? currentSong.title : null)
);

export const getCurrentSongUsername = createSelector(
  [getCurrentSong],
  currentSong => (currentSong ? currentSong.user.username : null)
);

export const getCurrentSongArtworkUrl = createSelector(
  [getCurrentSong],
  currentSong => (currentSong ? currentSong.artwork_url : null)
);

export const getPlayerMode = createSelector(
  [fromReducers.getPlayerMode],
  mode => mode
);

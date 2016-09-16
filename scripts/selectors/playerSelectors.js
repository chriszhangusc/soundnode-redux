import {createSelector} from 'reselect';
import {generateStreamUrl} from '../utils/SongUtils';
import * as fromReducers from '../reducers';

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
  [fromReducers.getPlayerSongMap, fromReducers.getCurrentSongId],
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
  currentSong => currentSong.title
);

export const getCurrentSongUsername = createSelector(
  [getCurrentSong],
  currentSong => currentSong.user.username
);

export const getCurrentSongArtworkUrl = createSelector(
  [getCurrentSong],
  currentSong => currentSong.artwork_url
);

export const getPlayerMode = createSelector(
  [fromReducers.getPlayerMode],
  mode => mode
);

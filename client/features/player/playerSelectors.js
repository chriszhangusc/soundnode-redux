import { getTracks } from 'features/entities/entitiesSelectors';
import { getStreamUrl } from 'common/utils/apiUtils';
import { createSelector } from 'reselect';
import { SHUFFLE } from './playerConsts';

/* Basic Selectors */
export const getPlayerState = state => state.player;

export const getActiveTrackId = createSelector(getPlayerState, state => state.activeTrackId);

export const isPlayQueueHidden = createSelector(getPlayerState, state => state.hidden);

export const isPlayerPlaying = createSelector(getPlayerState, state => state.playing);

export const isPlayerLoading = createSelector(getPlayerState, state => state.loading);

export const isPlayerSeeking = createSelector(getPlayerState, state => state.seeking);

export const getCurrentTime = createSelector(getPlayerState, state => state.currentTime);

export const getPlayerMode = createSelector(getPlayerState, state => state.mode);

export const isVolumeSeeking = createSelector(getPlayerState, state => state.volumeSeeking);

export const getCurrentVolume = createSelector(getPlayerState, state => state.volume);

export const isInShuffleMode = createSelector(getPlayerMode, mode => mode === SHUFFLE);
// Change to getActiveTrack
export const getCurrentPlayerTrack = createSelector(
  getActiveTrackId,
  getTracks,
  (trackId, tracks) => trackId && tracks[String(trackId)],
);

/* Memoized Selectors by Reselect */
/* Return if the current track(byId) is loaded in player. (Paused or Playing) */
export function isTrackActive(state, trackId) {
  const playerTrackId = getActiveTrackId(state);
  return playerTrackId === trackId;
}

export const isTrackPlaying = (state, id) => isTrackActive(state, id) && isPlayerPlaying(state);

export const getPlayerStreamUrl = createSelector(
  getCurrentPlayerTrack,
  track => track && getStreamUrl(track),
);

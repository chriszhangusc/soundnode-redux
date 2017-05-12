import { getTracks } from 'client/features/entities/entitiesSelectors';
import { createSelector } from 'reselect';
import { SHUFFLE } from './playerConsts';

/* Basic Selectors */
export const getPlayerState = state => state.player;

export const getPlayerTrackId = createSelector(getPlayerState, state => state.trackId);

export const isPlayerPlaying = createSelector(getPlayerState, state => state.playing);

export const isPlayerSeeking = createSelector(getPlayerState, state => state.seeking);

export const getCurrentTime = createSelector(getPlayerState, state => state.currentTime);

export const getPlayerMode = createSelector(getPlayerState, state => state.mode);

export const isVolumeSeeking = createSelector(getPlayerState, state => state.volumeSeeking);

export const getCurrentVolume = createSelector(getPlayerState, state => state.volume);

export const isInShuffleMode = createSelector(getPlayerMode, mode => mode === SHUFFLE);

export const getCurrentPlayerTrack = createSelector(
  getPlayerTrackId,
  getTracks,
  (trackId, tracks) => trackId && tracks[String(trackId)],
);

/* Memoized Selectors by Reselect*/
/* Return if the current track(byId) is loaded in player. (Paused or Playing) */
export function isTrackActive(state, trackId) {
  const playerTrackId = getPlayerTrackId(state);
  return playerTrackId === trackId;
}

export const isTrackPlaying = (state, id) => isTrackActive(state, id) && isPlayerPlaying(state);

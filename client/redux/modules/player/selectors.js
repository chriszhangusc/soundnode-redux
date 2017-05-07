import { getTrackById } from 'client/redux/modules/entities/selectors';
import { createSelector } from 'reselect';
import { SHUFFLE } from './consts';

/* Basic Selectors */
export const getPlayerState = state => state.player;
export const getPlayerTrackId = state => getPlayerState(state).trackId;
export const isPlayerPlaying = state => getPlayerState(state).playing;
export const isPlayerSeeking = state => getPlayerState(state).seeking;
export const getCurrentTime = state => getPlayerState(state).currentTime;
export const getPlayerMode = state => getPlayerState(state).mode;
export const isVolumeSeeking = state => getPlayerState(state).volumeSeeking;
export const getCurrentVolume = state => getPlayerState(state).volume;

/* Memoized Selectors by Reselect*/
/* Return if the current track(byId) is loaded in player. (Paused or Playing) */
export function isTrackActive(state, trackId) {
  const playerTrackId = getPlayerTrackId(state);
  if (playerTrackId && trackId) {
    return playerTrackId.toString() === trackId.toString();
  }
  return false;
}

export const isTrackPlaying = (state, id) => isTrackActive(state, id) && isPlayerPlaying(state);

// export const isInShuffleMode = state => getPlayerState(state).mode === SHUFFLE;
export const isInShuffleMode = createSelector(
  getPlayerMode,
  mode => (mode === SHUFFLE),
);

export function getCurrentPlayerTrack(state) {
  const trackId = getPlayerTrackId(state);
  return getTrackById(state, trackId);
}



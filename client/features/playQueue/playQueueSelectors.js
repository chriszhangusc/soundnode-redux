import { createSelector } from 'reselect';
import { isInShuffleMode } from 'features/player/playerSelectors';

export const getPlayQueueState = state => state.playQueue;

export const isPlayQueueHidden = createSelector(getPlayQueueState, state => state.hidden);

export const getActivePlayQueueName = createSelector(
  getPlayQueueState,
  state => state.activePlayQueueName,
);

export const getVisiblePlayQueueName = createSelector(
  getPlayQueueState,
  state => state.visiblePlayQueueName,
);

export const getShuffledPlayQueue = createSelector(
  getPlayQueueState,
  state => state.shuffledPlayQueue,
);

export const getVisiblePlayQueue = createSelector(
  getPlayQueueState,
  getVisiblePlayQueueName,
  (state, playQueueName) => playQueueName && state[playQueueName],
);

/* Memoize Selectors By Reselect */
export const getActivePlayQueue = createSelector(getPlayQueueState, state => state.activePlayQueue);

export const getPlayQueueByMode = createSelector(
  isInShuffleMode,
  getShuffledPlayQueue,
  getActivePlayQueue,
  (inShuffleMode, shufflePlayQueue, activePlayQueue) =>
    inShuffleMode ? shufflePlayQueue : activePlayQueue,
);

export function getPlayQueueByName(state, name) {
  return name && state[name];
}

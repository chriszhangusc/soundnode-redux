import { createSelector } from 'reselect';

import { isInShuffleMode } from 'features/player/playerSelectors';

export const getPlayQueueState = state => state.playQueue;

export const isPlayQueueHidden = createSelector(getPlayQueueState, state => state.hidden);

export const getActivePlayQueueName = createSelector(
  getPlayQueueState,
  state => state.activePlayQueueName,
);

export const getActivePlayQueue = createSelector(getPlayQueueState, state => state.activePlayQueue);

export const getShufflePlayQueue = createSelector(
  getPlayQueueState,
  state => state.shufflePlayQueue,
);

export const getPlayQueueByMode = createSelector(
  getActivePlayQueue,
  getShufflePlayQueue,
  isInShuffleMode,
  (playQueue, shuffleQueue, shuffleMode) => (shuffleMode ? shuffleQueue : playQueue),
);

export const getPlayQueueTitle = createSelector(getPlayQueueState, state => state.title);

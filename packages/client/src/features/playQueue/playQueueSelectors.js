import { createSelector } from 'reselect';

import { isInShuffleMode } from '@soundnode-redux/client/src/features/player/playerSelectors';

export const getPlayQueueState = state => state.playQueue;

export const isPlayQueueHidden = createSelector(getPlayQueueState, state => state.hidden);

export const getPlayQueueName = createSelector(getPlayQueueState, state => state.name);

export const getPlayQueueTitle = createSelector(getPlayQueueState, state => state.title);

export const getPlayQueue = createSelector(getPlayQueueState, state => state.playQueue);

export const getShufflePlayQueue = createSelector(
  getPlayQueueState,
  state => state.shufflePlayQueue,
);

export const getPlayQueueByMode = createSelector(
  getPlayQueue,
  getShufflePlayQueue,
  isInShuffleMode,
  (playQueue, shuffleQueue, shuffleMode) => (shuffleMode ? shuffleQueue : playQueue),
);

export const getActiveTooltipId = createSelector(getPlayQueueState, state => state.activeTooltipId);

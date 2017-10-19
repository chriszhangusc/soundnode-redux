import { createSelector } from 'reselect';

export const getPlayQueueState = state => state.playQueue;

export const isPlayQueueHidden = createSelector(getPlayQueueState, state => state.hidden);

export const getActivePlayQueueName = createSelector(
  getPlayQueueState,
  state => state.activePlayQueueName,
);

export const getActivePlayQueue = createSelector(getPlayQueueState, state => state.activePlayQueue);

import { createSelector } from 'reselect';

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


export const getVisiblePlayQueue = createSelector(
  getPlayQueueState,
  getVisiblePlayQueueName,
  (state, playQueueName) => playQueueName && (state[playQueueName] || []),
);

export const getActivePlayQueue = createSelector(getPlayQueueState, state => state.activePlayQueue);

export function getPlayQueueByName(state, name) {
  return name && state[name];
}

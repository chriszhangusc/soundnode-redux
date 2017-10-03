import { getActiveTrackId, isInShuffleMode } from 'features/player/playerSelectors';
import shuffle from 'lodash/shuffle';
import { removePlayerActiveTrack } from 'features/player/playerActions';
import { notificationSuccess } from 'features/notification/notificationActions';
import { shiftToFront } from './playQueueUtils';
import * as types from './playQueueActionTypes';

import {
  getActivePlayQueue,
  getVisiblePlayQueueName,
  getActivePlayQueueName,
  isPlayQueueHidden,
} from './playQueueSelectors';

export function hidePlayQueue() {
  return {
    type: types.PLAY_QUEUE_HIDE,
  };
}

export function showPlayQueue() {
  return {
    type: types.PLAY_QUEUE_SHOW,
  };
}

export const clearShufflePlayQueue = () => ({
  type: types.PLAY_QUEUE_SHUFFLE_PLAY_QUEUE_CLEAR,
});

export const updateShuffledPlayQueue = shuffledPlayQueue => ({
  type: types.PLAY_QUEUE_SHUFFLE_PLAY_QUEUE_UPDATE,
  payload: {
    shuffledPlayQueue,
  },
});

export const updateVisiblePlayQueueName = visiblePlayQueueName => ({
  type: types.PLAY_QUEUE_VISIBLE_PLAY_QUEUE_NAME_CHANGE,
  payload: {
    visiblePlayQueueName,
  },
});

export const updateActivePlayQueueName = activePlayQueueName => ({
  type: types.PLAY_QUEUE_ACTIVE_PLAY_QUEUE_NAME_CHANGE,
  payload: {
    activePlayQueueName,
  },
});

export function togglePlayQueue() {
  return (dispatch, getState) => {
    const state = getState();
    const hidden = isPlayQueueHidden(state);
    if (hidden) {
      dispatch(showPlayQueue());
    } else {
      dispatch(hidePlayQueue());
    }
  };
}

export function mergePlayQueue(playQueueName, trackIds) {
  return {
    type: types.PLAY_QUEUE_MERGE,
    payload: {
      playQueueName,
      trackIds,
    },
  };
}

export function removeTrackFromPlayQueue(trackId) {
  return {
    type: types.PLAY_QUEUE_TRACK_REMOVE,
    payload: {
      trackId,
    },
  };
}

export function removeTrackFromPlayQueueAndPlayer(trackId) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(removeTrackFromPlayQueue(trackId));
    const activeTrackId = getActiveTrackId(state);
    if (activeTrackId === trackId) {
      dispatch(removePlayerActiveTrack(trackId));
    }
  };
}

/* Thunks logic */

// Shuffle the current active playQueue and update shuffled playQueue with it
export function shufflePlayQueue() {
  return (dispatch, getState) => {
    const state = getState();
    const activePlayQueue = getActivePlayQueue(state);
    const playerTrackId = getActiveTrackId(state);
    // Every time we reshuffle the playQueue, we need to move the current playing track to the
    // first position.
    const shuffled = shiftToFront(shuffle(activePlayQueue), playerTrackId);
    dispatch(updateShuffledPlayQueue(shuffled));
  };
}

export function updateShuffledPlayQueueIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const inShuffleMode = isInShuffleMode(state);
    const visiblePlayQueueName = getVisiblePlayQueueName(state);
    const activePlayQueueName = getActivePlayQueueName(state);
    if (inShuffleMode && visiblePlayQueueName === activePlayQueueName) {
      dispatch(shufflePlayQueue());
    }
  };
}

export function mergeVisiblePlayQueue(playQueue) {
  return (dispatch, getState) => {
    // playQueue could be a single trackId or an array of trackIds
    const trackIds = [...playQueue];
    const state = getState();
    const visiblePlayQueueName = getVisiblePlayQueueName(state);
    dispatch(mergePlayQueue(visiblePlayQueueName, trackIds));
    dispatch(updateShuffledPlayQueueIfNeeded());
  };
}

// Sync active play queue(playlist) with visible play queue
export function syncActivePlayQueue() {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlayQueueName = getVisiblePlayQueueName(state);
    dispatch(updateActivePlayQueueName(visiblePlayQueueName));
  };
}

// Called when playing song through song cards list
export function switchActivePlayQueueIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlayQueueName = getVisiblePlayQueueName(state);
    const activePlayQueueName = getActivePlayQueueName(state);
    // Sync active play queue with currently visible play queue.
    dispatch(syncActivePlayQueue());
    if (activePlayQueueName !== visiblePlayQueueName) {
      dispatch(updateShuffledPlayQueueIfNeeded());
      // Update shuffled playQueue
      // Reshuffle the new active playQueue if in shuffle mode
    }
  };
}

export function clearPlayQueue() {
  return (dispatch) => {
    // Remove player track
    dispatch(removePlayerActiveTrack());
    dispatch({ type: types.PLAY_QUEUE_CLEAR });
    dispatch(hidePlayQueue());
    dispatch(notificationSuccess('Play Queue Cleared'));
  };
}

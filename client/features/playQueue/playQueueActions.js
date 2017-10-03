import { getActiveTrackId, isInShuffleMode } from 'features/player/playerSelectors';
import shuffle from 'lodash/shuffle';
import { removePlayerActiveTrack } from 'features/player/playerActions';
import { notificationSuccess } from 'features/notification/notificationActions';
import { shiftToFront } from './playQueueUtils';
import * as types from './playQueueActionTypes';

import {
  getActivePlayQueue,
  getVisiblePlayQueueName,
  getVisiblePlayQueue,
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

export const updateVisiblePlayQueueName = visiblePlayQueueName => ({
  type: types.PLAY_QUEUE_VISIBLE_PLAY_QUEUE_NAME_CHANGE,
  payload: {
    visiblePlayQueueName,
  },
});

export const updateActivePlayQueue = trackIds => ({
  type: types.PLAY_QUEUE_ACTIVE_PLAY_QUEUE_UPDATE,
  payload: {
    trackIds,
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

// Shuffle the current active play queue.
export function shufflePlayQueue() {
  return (dispatch, getState) => {
    const state = getState();
    const activePlayQueue = getActivePlayQueue(state);
    const playerTrackId = getActiveTrackId(state);
    // Every time we reshuffle the playQueue, we need to move the current playing track to the
    // first position.
    const shuffled = shiftToFront(shuffle(activePlayQueue), playerTrackId);
    dispatch(updateActivePlayQueue(shuffled));
  };
}

export function mergeVisiblePlayQueue(playQueue) {
  return (dispatch, getState) => {
    // playQueue could be a single trackId or an array of trackIds
    const trackIds = [...playQueue];
    const state = getState();
    const visiblePlayQueueName = getVisiblePlayQueueName(state);
    dispatch(mergePlayQueue(visiblePlayQueueName, trackIds));
  };
}

// Sync active play queue(playlist) with visible play queue
export function syncActivePlayQueue() {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlayQueueName = getVisiblePlayQueueName(state);
    const activePlayQueueName = getActivePlayQueueName(state);
    const visiblePlayQueue = getVisiblePlayQueue(state);
    const activePlayQueue = getActivePlayQueue(state);
    const shuffleMode = isInShuffleMode(state);
    // 1. When we fetched more tracks, the active and visible play queue would be out of sync,
    //    thus reshuffle is needed.
    // 2. When we switched to a new visible playlist, we need to shuffle the new active play queue.
    const shuffleNeeded =
      (activePlayQueue.length !== visiblePlayQueue.length ||
        activePlayQueueName !== visiblePlayQueueName) &&
      shuffleMode;
    dispatch(updateActivePlayQueueName(visiblePlayQueueName));
    dispatch(updateActivePlayQueue(visiblePlayQueue));
    if (shuffleNeeded) {
      dispatch(shufflePlayQueue());
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

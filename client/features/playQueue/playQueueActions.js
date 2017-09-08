import { getActiveTrackId, isInShuffleMode } from 'features/player/playerSelectors';
import shuffle from 'lodash/shuffle';
import { removeActiveTrackFromPlayer } from 'features/player/playerActions';
import { shiftToFront } from './playQueueUtils';
import * as types from './playQueueActionTypes';

import {
  getActivePlayQueue,
  getVisiblePlayQueueName,
  getActivePlayQueueName,
} from './playQueueSelectors';

export function clearPlayQueue() {
  return {
    type: types.PLAY_QUEUE_CLEAR_QUEUE,
    payload: {
      notificationSuccess: 'Play Queue Cleared!',
    },
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

export const togglePlayQueue = () => ({ type: types.PLAY_QUEUE_TOGGLE });

// export function updatePlayQueue(playQueueName, trackIds) {
//   return {
//     type: types.PLAY_QUEUE_UPDATE,
//     payload: {
//       playQueueName,
//       trackIds,
//     },
//   };
// }

// export function appendToPlayQueue(playQueueName, trackIds) {
//   return {
//     type: types.PLAY_QUEUE_APPEND,
//     payload: {
//       playQueueName,
//       trackIds,
//     },
//   };
// }

export function mergePlayQueue(playQueueName, trackIds) {
  return {
    type: types.PLAY_QUEUE_MERGE,
    payload: {
      playQueueName,
      trackIds,
    },
  };
}

export function removePlayQueue(playQueueName) {
  return {
    type: types.PLAY_QUEUE_REMOVE,
    payload: {
      playQueueName,
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
      dispatch(removeActiveTrackFromPlayer(trackId));
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

export function removeVisiblePlayQueue() {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlayQueueName = getVisiblePlayQueueName(state);
    dispatch(removePlayQueue(visiblePlayQueueName));
  };
}

// export function updateVisiblePlayQueue(trackIds) {
//   return (dispatch, getState) => {
//     const state = getState();
//     const visiblePlayQueueName = getVisiblePlayQueueName(state);
//     // Keep the side effects in the thunks
//     dispatch(updatePlayQueue(visiblePlayQueueName, uniq(trackIds)));
//     dispatch(updateShuffledPlayQueueIfNeeded());
//   };
// }

// export function appendToVisiblePlayQueue(trackIds) {
//   return (dispatch, getState) => {
//     const state = getState();
//     const visiblePlayQueueName = getVisiblePlayQueueName(state);
//     // Keep the side effects in the thunks
//     dispatch(appendToPlayQueue(visiblePlayQueueName, uniq(trackIds)));
//     dispatch(updateShuffledPlayQueueIfNeeded());
//   };
// }

// export function updatePlayQueueIfNeeded(playQueueName, playQueueIds) {
//   return (dispatch, getState) => {
//     const state = getState();
//     const inShuffleMode = isInShuffleMode(state);
//     const visiblePlayQueueName = getVisiblePlayQueueName(state);
//     const activePlayQueueName = getActivePlayQueueName(state);
//     if (visiblePlayQueueName !== activePlayQueueName) return;
//     if (inShuffleMode) {
//       console.log('Update shuffle playQueue');
//       // Fix later
//       // dispatch(shufflePlayQueue());
//     } else {
//       // Normal playQueue update
//       dispatch(updatePlayQueue(playQueueName, playQueueIds));
//     }
//   };
// }

// Called when playing song through song cards list
export function switchActivePlayQueueIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlayQueueName = getVisiblePlayQueueName(state);
    const activePlayQueueName = getActivePlayQueueName(state);
    if (activePlayQueueName !== visiblePlayQueueName) {
      dispatch(updateActivePlayQueueName(visiblePlayQueueName));
      dispatch(updateShuffledPlayQueueIfNeeded());
      // Update shuffled playQueue
      // Reshuffle the new active playQueue if in shuffle mode
    }
  };
}

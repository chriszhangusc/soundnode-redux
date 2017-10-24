import shuffle from 'lodash/shuffle';
import { getActiveTrackId, isInShuffleMode } from 'features/player/playerSelectors';
import { removeActiveTrack } from 'features/player/playerActions';
import { notificationSuccess } from 'features/notification/notificationActions';
import { shiftToFront } from './playQueueUtils';
import * as types from './playQueueActionTypes';
import { getPlayQueue, isPlayQueueHidden, getPlayQueueName } from './playQueueSelectors';

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

export const updatePlayQueue = playlist => ({
  type: types.PLAY_QUEUE_UPDATE,
  payload: {
    playlist,
  },
});

export const mergePlayQueue = trackIds => ({
  type: types.PLAY_QUEUE_MERGE,
  payload: {
    trackIds,
  },
});

export const mergeShufflePlayQueue = trackIds => ({
  type: types.PLAY_QUEUE_SHUFFLE_QUEUE_MERGE,
  payload: {
    trackIds,
  },
});

export const updateShufflePlayQueue = trackIds => ({
  type: types.PLAY_QUEUE_SHUFFLE_QUEUE_UPDATE,
  payload: {
    trackIds,
  },
});

export const clearShuffleQueue = () => ({
  type: types.PLAY_QUEUE_SHUFFLE_QUEUE_CLEAR,
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
      dispatch(removeActiveTrack(trackId));
    }
  };
}

export function updateActiveTooltip(tooltipId) {
  return {
    type: types.PLAY_QUEUE_ACTIVE_TOOLTIP_UPDATE,
    payload: {
      tooltipId,
    },
  };
}

/* Thunks logic */

// Shuffle the current active play queue.
export function shufflePlayQueue() {
  return (dispatch, getState) => {
    const state = getState();
    const playQueue = getPlayQueue(state);
    const playerTrackId = getActiveTrackId(state);
    // Every time we reshuffle the playQueue, we need to move the current playing track to the
    // first position.
    const shuffled = shiftToFront(shuffle(playQueue), playerTrackId);
    dispatch(updateShufflePlayQueue(shuffled));
  };
}

export function appendToPlayQueueIfNeeded(newTrackIds, playlistName) {
  return (dispatch, getState) => {
    const state = getState();
    const activePlayQueueName = getPlayQueueName(state);
    // FIXME: Should we do this here?
    if (playlistName === activePlayQueueName) {
      dispatch(mergePlayQueue(newTrackIds));
      // Shuffle the newly added trackIds and append to the end of the queue.
      if (isInShuffleMode(state)) {
        dispatch(mergeShufflePlayQueue(shuffle(newTrackIds)));
      }
    }
  };
}

export function clearPlayQueue() {
  return (dispatch) => {
    // Remove player track
    dispatch(removeActiveTrack());
    dispatch({ type: types.PLAY_QUEUE_CLEAR });
    dispatch(hidePlayQueue());
    dispatch(notificationSuccess('Play Queue Cleared'));
  };
}

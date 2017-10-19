import remove from 'lodash/remove';
import { mergeArrays } from 'common/utils/generalUtils';
import * as types from './playQueueActionTypes';

const initialState = {
  activePlayQueueName: undefined,
  activePlayQueue: [],
  hidden: true,
};

// #TODO: also need to handle play queue shuffle
export function clearPlayQueue(state) {
  return {
    ...state,
    activePlayQueue: [],
  };
}

export function mergeActivePlayQueue(state, { trackIds }) {
  return {
    ...state,
    activePlayQueue: mergeArrays(state.activePlayQueue, trackIds),
  };
}

export function updateActivePlayQueue(state, { trackIds, name }) {
  return {
    ...state,
    activePlayQueue: [...trackIds],
    activePlayQueueName: name,
  };
}

export function removeTrackFromPlayQueue(state, { trackId }) {
  const newActivePlayQueue = remove(state.activePlayQueue, item => item !== trackId);
  return {
    ...state,
    activePlayQueue: [...newActivePlayQueue],
  };
}

export function showPlayQueue(state) {
  return {
    ...state,
    hidden: false,
  };
}

export function hidePlayQueue(state) {
  return {
    ...state,
    hidden: true,
  };
}

export default function playQueueReducer(state = initialState, action) {
  switch (action.type) {
    case types.PLAY_QUEUE_SHOW:
      return showPlayQueue(state);

    case types.PLAY_QUEUE_HIDE:
      return hidePlayQueue(state);

    case types.PLAY_QUEUE_TRACK_REMOVE:
      return removeTrackFromPlayQueue(state, action.payload);

    case types.PLAY_QUEUE_CLEAR:
      return clearPlayQueue(state, action.payload);

    case types.PLAY_QUEUE_ACTIVE_PLAY_QUEUE_UPDATE:
      return updateActivePlayQueue(state, action.payload);

    case types.PLAY_QUEUE_ACTIVE_PLAY_QUEUE_MERGE:
      return mergeActivePlayQueue(state, action.payload);

    default:
      return state;
  }
}

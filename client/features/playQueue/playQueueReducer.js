import { mergeArrays } from 'common/utils/generalUtils';
import * as types from './playQueueActionTypes';

const initialState = {
  activePlayQueueName: undefined,
  visiblePlayQueueName: undefined,
  hidden: true,
  shuffledPlayQueue: [],
};

export function appendVisiblePlayQueue(state, { newPlayQueue }) {
  return {
    ...state,
    visiblePlayQueue: [...state.visiblePlayQueue, ...newPlayQueue],
  };
}

export function updateVisiblePlayQueue(state, { visiblePlayQueue }) {
  return {
    ...state,
    [state.visiblePlayQueueName]: [...visiblePlayQueue],
  };
}

export function updateShuffledPlayQueue(state, { shuffledPlayQueue }) {
  return {
    ...state,
    shuffledPlayQueue: [...shuffledPlayQueue],
  };
}

export function clearShufflePlayQueue(state) {
  return {
    ...state,
    shufflePlayQueue: [],
  };
}

export function togglePlayQueue(state) {
  return {
    ...state,
    hidden: !state.hidden,
  };
}

export function updateVisiblePlayQueueName(state, { visiblePlayQueueName }) {
  return {
    ...state,
    visiblePlayQueueName,
  };
}

export function updateActivePlayQueueName(state, { activePlayQueueName }) {
  return {
    ...state,
    activePlayQueueName,
  };
}

export function updatePlayQueue(state, { playQueueName, trackIds }) {
  return {
    ...state,
    [playQueueName]: [...trackIds],
  };
}

export function appendToPlayQueue(state, { playQueueName, trackIds }) {
  const newPlayQueue = state[playQueueName] ? [...state[playQueueName], ...trackIds] : [...trackIds];
  return {
    ...state,
    [playQueueName]: newPlayQueue,
  };
}

export function mergePlayQueue(state, { playQueueName, trackIds }) {
  const curPlayQueue = state[playQueueName] ? state[playQueueName] : [];
  return {
    ...state,
    // There is order in merged array!!
    [playQueueName]: mergeArrays(curPlayQueue, trackIds),
  };
}

export function removePlayQueue(state, { playQueueName }) {
  const newState = { ...state };
  delete newState[playQueueName];
  return newState;
}

export default function playQueueReducer(state = initialState, action) {
  switch (action.type) {
    // case types.PLAY_QUEUE_UPDATE:
    //   return updatePlayQueue(state, action.payload);

    // case types.PLAY_QUEUE_APPEND:
    //   return appendToPlayQueue(state, action.payload);

    case types.PLAY_QUEUE_MERGE:
      return mergePlayQueue(state, action.payload);

    case types.PLAY_QUEUE_REMOVE:
      return removePlayQueue(state, action.payload);

    case types.PLAY_QUEUE_SHUFFLE_PLAY_QUEUE_UPDATE:
      return updateShuffledPlayQueue(state, action.payload);

    case types.PLAY_QUEUE_SHUFFLE_PLAY_QUEUE_CLEAR:
      return clearShufflePlayQueue(state);

    case types.PLAY_QUEUE_TOGGLE:
      return togglePlayQueue(state);
    // Need to handle shuffle mode!!
    case types.APPEND_TRACK_TO_PLAY_QUEUE:
      return appendToPlayQueue(state, action.payload);

    case types.PLAY_QUEUE_CLEAR_QUEUE:
      return {
        ...initialState,
      };

    case types.PLAY_QUEUE_VISIBLE_PLAY_QUEUE_NAME_CHANGE:
      return updateVisiblePlayQueueName(state, action.payload);

    case types.PLAY_QUEUE_ACTIVE_PLAY_QUEUE_NAME_CHANGE:
      return updateActivePlayQueueName(state, action.payload);

    default:
      return state;
  }
}

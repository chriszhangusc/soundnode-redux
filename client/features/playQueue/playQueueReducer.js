import remove from 'lodash/remove';
import { mergeArrays } from 'common/utils/generalUtils';
import * as types from './playQueueActionTypes';

const initialState = {
  name: '',
  title: '',
  playQueue: [],
  shufflePlayQueue: [],
  hidden: true,
};

// #TODO: also need to handle play queue shuffle
export function clearPlayQueue(state) {
  return {
    ...state,
    playQueue: [],
  };
}

export function mergeShufflePlayQueue(state, { trackIds }) {
  return {
    ...state,
    shufflePlayQueue: mergeArrays(state.shufflePlayQueue, trackIds),
  };
}

export function updateShufflePlayQueue(state, { trackIds }) {
  return {
    ...state,
    shufflePlayQueue: [...trackIds],
  };
}

export function updatePlayQueue(state, { playlist }) {
  const { trackIds, name, title } = playlist;
  return {
    ...state,
    playQueue: [...trackIds],
    name,
    title,
  };
}

export function mergePlayQueue(state, { trackIds }) {
  return {
    ...state,
    playQueue: mergeArrays(state.playQueue, trackIds),
  };
}

export function removeTrackFromPlayQueue(state, { trackId }) {
  const newActivePlayQueue = remove(state.playQueue, item => item !== trackId);
  return {
    ...state,
    playQueue: [...newActivePlayQueue],
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

export function clearShufflePlayQueue(state) {
  return {
    ...state,
    shufflePlayQueue: [],
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

    case types.PLAY_QUEUE_UPDATE:
      return updatePlayQueue(state, action.payload);

    case types.PLAY_QUEUE_MERGE:
      return mergePlayQueue(state, action.payload);

    case types.PLAY_QUEUE_SHUFFLE_QUEUE_MERGE:
      return mergeShufflePlayQueue(state, action.payload);

    case types.PLAY_QUEUE_SHUFFLE_QUEUE_UPDATE:
      return updateShufflePlayQueue(state, action.payload);

    case types.PLAY_QUEUE_SHUFFLE_QUEUE_CLEAR:
      return clearShufflePlayQueue(state);
    default:
      return state;
  }
}

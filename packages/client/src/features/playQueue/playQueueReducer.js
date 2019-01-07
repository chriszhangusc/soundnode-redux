import { createReducer } from '@soundnode-redux/client/src/common/utils/reducerUtils';
import remove from 'lodash/remove';
import { mergeArrays } from '@soundnode-redux/client/src/common/utils/generalUtils';
import * as types from './playQueueActionTypes';

const initialState = {
  name: '',
  title: '',
  playQueue: [],
  shufflePlayQueue: [],
  hidden: true,
  activeTooltipId: null,
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

function updateActiveTooltip(state, { tooltipId }) {
  return {
    ...state,
    activeTooltipId: tooltipId,
  };
}

export default createReducer(initialState, {
  [types.PLAY_QUEUE_SHOW]: showPlayQueue,
  [types.PLAY_QUEUE_HIDE]: hidePlayQueue,
  [types.PLAY_QUEUE_TRACK_REMOVE]: removeTrackFromPlayQueue,
  [types.PLAY_QUEUE_CLEAR]: clearPlayQueue,
  [types.PLAY_QUEUE_UPDATE]: updatePlayQueue,
  [types.PLAY_QUEUE_MERGE]: mergePlayQueue,
  [types.PLAY_QUEUE_SHUFFLE_QUEUE_MERGE]: mergeShufflePlayQueue,
  [types.PLAY_QUEUE_SHUFFLE_QUEUE_UPDATE]: updateShufflePlayQueue,
  [types.PLAY_QUEUE_SHUFFLE_QUEUE_CLEAR]: clearShufflePlayQueue,
  [types.PLAY_QUEUE_ACTIVE_TOOLTIP_UPDATE]: updateActiveTooltip,
});

import { createReducer } from 'common/utils/reducerUtils';
import * as types from './streamActionTypes';

const initialState = {
  fetching: false,
  streamIds: [],
  nextHref: null,
};

export function startFetchingStream(state) {
  return {
    ...state,
    fetching: true,
  };
}

export function stopFetchingStream(state) {
  return {
    ...state,
    fetching: false,
  };
}

export function mergeStream(state, { streamIds }) {
  return {
    ...state,
    // streamIds: mergeArrays(streamIds, state.streamIds),
    streamIds: [...state.streamIds, ...streamIds],
  };
}

export function updateNextHref(state, { nextHref }) {
  return {
    ...state,
    nextHref,
  };
}

export function resetStreamState(initState) {
  return {
    ...initState,
  };
}

export default createReducer(initialState, {
  [types.STREAM_FETCH_START]: startFetchingStream,
  [types.STREAM_FETCH_STOP]: stopFetchingStream,
  [types.STREAM_MERGE]: mergeStream,
  [types.STREAM_NEXT_HREF_UPDATE]: updateNextHref,
  [types.STREAM_STATE_RESET]: resetStreamState,
});

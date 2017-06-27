import { mergeArrays } from 'common/utils/generalUtils';
import * as types from './streamConsts';

const initialState = {
  fetching: false,
  // streamIds: [],
  nextHref: undefined,
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

// export function mergeStream(state, { streamIds }) {
//   return {
//     ...state,
//     streamIds: mergeArrays(streamIds, state.streamIds),
//   };
// }

export function updateNextHref(state, { nextHref }) {
  return {
    ...state,
    nextHref,
  };
}

export function resetStreamState(initial) {
  return {
    ...initial,
  };
}

export default function streamReducer(state = initialState, action) {
  switch (action.type) {
    case types.STREAM_FETCH_START:
      return startFetchingStream(state);

    case types.STREAM_FETCH_STOP:
      return stopFetchingStream(state);

    // case types.STREAM_MERGE:
    //   return mergeStream(state, action.payload);

    case types.STREAM_NEXT_HREF_UPDATE:
      return updateNextHref(state, action.payload);

    case types.STREAM_STATE_RESET:
      return resetStreamState(initialState);

    default:
      return state;
  }
}

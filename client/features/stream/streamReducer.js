import * as types from './streamConsts';

const initialState = {
  fetching: false,
  streamIds: [],
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

export function appendStream(state, { streamIds }) {
  return {
    ...state,
    streamIds: [...state.streamIds, ...streamIds],
  };
}

export function updateNextHref(state, { nextHref }) {
  return {
    ...state,
    nextHref,
  };
}

export default function streamReducer(state = initialState, action) {
  switch (action.type) {
    case types.STREAM_FETCH_START:
      return startFetchingStream(state);

    case types.STREAM_FETCH_STOP:
      return stopFetchingStream(state);

    case types.STREAM_APPEND:
      return appendStream(state, action.payload);

    case types.STREAM_NEXT_HREF_UPDATE:
      return updateNextHref(state, action.payload);

    default:
      return state;
  }
}

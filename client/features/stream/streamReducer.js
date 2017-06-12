import { STREAM_REQUEST, STREAM_SET, STREAM_APPEND } from './streamConsts';

const initialState = {
  fetching: false,
  streamIds: [],
  nextHref: null,
};

function requestStream(state) {
  return {
    ...state,
    fetching: true,
  };
}

function setStreamIds(state, { streamIds, nextHref }) {
  return {
    ...state,
    streamIds: [...streamIds],
    fetching: false,
    nextHref,
  };
}

function appendStreamIds(state, { streamIds, nextHref }) {
  return {
    ...state,
    streamIds: [...state.streamIds, ...streamIds],
    fetching: false,
    nextHref,
  };
}

export default function streamReducer(state = initialState, action) {
  switch (action.type) {
    case STREAM_REQUEST:
      return requestStream(state);
    case STREAM_SET:
      return setStreamIds(state, action.payload);
    case STREAM_APPEND:
      return appendStreamIds(state, action.payload);
    default:
      return state;
  }
}

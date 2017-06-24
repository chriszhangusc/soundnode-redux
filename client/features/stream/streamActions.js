import { getMyId } from 'features/auth/authSelectors';
import { STREAM_SET, STREAM_APPEND, STREAM_REQUEST } from './streamConsts';
import { fetchStream, fetchMoreStream } from './streamApi';

export function requestStream() {
  return {
    type: STREAM_REQUEST,
  };
}

export function setStream({ result, nextHref }) {
  return {
    type: STREAM_SET,
    payload: {
      streamIds: result,
      nextHref,
    },
  };
}

export function appendStream({ result, nextHref }) {
  return {
    type: STREAM_APPEND,
    payload: {
      streamIds: result,
      nextHref,
    },
  };
}

export function loadStreamData() {
  return (dispatch, getState) => {
    const state = getState();
    const userId = getMyId(state);
    if (userId) {
      dispatch(requestStream());
      fetchStream(userId).then((normalized) => {
        // console.log(normalized);
        dispatch(setStream(normalized));
      });
    }
  };
}

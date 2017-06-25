import { mergeEntities } from 'features/entities/entitiesActions';
import * as types from './streamConsts';
import { fetchStream, fetchMoreStream } from './streamApi';
import { isStreamFetching, getStreamNextHref } from './streamSelectors';

export function startFetchingStream() {
  return {
    type: types.STREAM_FETCH_START,
  };
}

export function stopFetchingStream() {
  return {
    type: types.STREAM_FETCH_STOP,
  };
}

export function mergeStream(streamIds) {
  return {
    type: types.STREAM_MERGE,
    payload: {
      streamIds,
    },
  };
}

export function updateStreamNextHref(nextHref) {
  return {
    type: types.STREAM_NEXT_HREF_UPDATE,
    payload: {
      nextHref,
    },
  };
}

export function resetStreamState() {
  return {
    type: types.STREAM_STATE_RESET,
  };
}

export function loadStreamData() {
  return (dispatch, getState) => {
    const state = getState();
    const streamFetching = isStreamFetching(state);
    if (!streamFetching) {
      console.log('First Load');
      dispatch(startFetchingStream());
      fetchStream()
        .then((normalized) => {
          const { entities, result, nextHref } = normalized;
          dispatch(mergeEntities(entities));
          dispatch(mergeStream(result));
          dispatch(updateStreamNextHref(nextHref));
          dispatch(stopFetchingStream());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
}

export function loadMoreStreamData() {
  return (dispatch, getState) => {
    const state = getState();
    const streamFetching = isStreamFetching(state);
    const curNextHref = getStreamNextHref(state);
    if (!streamFetching && curNextHref) {
      dispatch(startFetchingStream());
      fetchMoreStream(curNextHref)
        .then((normalized) => {
          const { entities, result, nextHref } = normalized;
          dispatch(mergeEntities(entities));
          dispatch(mergeStream(result));
          dispatch(updateStreamNextHref(nextHref));
          dispatch(stopFetchingStream());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
}

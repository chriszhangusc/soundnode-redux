import { mergeEntities } from 'features/entities/entitiesActions';
import { mergeVisiblePlaylist } from 'features/playlist/playlistActions';
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

export function receiveStream(normalized) {
  return (dispatch) => {
    const { entities, result, nextHref } = normalized;
    dispatch(mergeEntities(entities));
    dispatch(mergeVisiblePlaylist(result));
    dispatch(updateStreamNextHref(nextHref));
    dispatch(stopFetchingStream());
  };
}

export function loadStream() {
  return (dispatch, getState) => {
    const state = getState();
    const streamFetching = isStreamFetching(state);
    if (!streamFetching) {
      console.log('First Load');
      dispatch(startFetchingStream());
      fetchStream()
        .then((normalized) => {
          dispatch(receiveStream(normalized));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
}

export function loadMoreStream() {
  return (dispatch, getState) => {
    const state = getState();
    const streamFetching = isStreamFetching(state);
    const curNextHref = getStreamNextHref(state);
    if (!streamFetching && curNextHref) {
      dispatch(startFetchingStream());
      fetchMoreStream(curNextHref)
        .then((normalized) => {
          dispatch(receiveStream(normalized));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
}

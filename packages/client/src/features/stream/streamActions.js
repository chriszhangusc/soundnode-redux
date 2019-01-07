import { defaultWarning } from '@soundnode-redux/client/src/features/notification/notificationActions';
import { mergeEntities } from '@soundnode-redux/client/src/features/entities/entitiesActions';
import { appendToPlayQueueIfNeeded } from '@soundnode-redux/client/src/features/playQueue/playQueueActions';
import { fetchMyStream } from '@soundnode-redux/client/src/common/api/meApi';
import { normalizeTracks } from '@soundnode-redux/client/src/common/utils/normalizeUtils';
import { makeRequest } from '@soundnode-redux/client/src/common/utils/apiUtils';
import * as types from './streamActionTypes';
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
    dispatch(mergeStream(result));
    dispatch(updateStreamNextHref(nextHref));
    dispatch(appendToPlayQueueIfNeeded(result, 'stream'));
    dispatch(stopFetchingStream());
  };
}

// Repsonse
// {
//   collection: [{ type: 'playlist-repost', ... }, { type: 'track-repost', ... }],
//   nextHref: ...
// }

// FIXME: Currently only show tracks until we figure out a way to display playlist.
function transform(response) {
  return {
    ...response,
    collection: response.collection.map(item => item.track),
  };
}

export function loadStream() {
  return (dispatch, getState) => {
    const state = getState();
    const streamFetching = isStreamFetching(state);
    if (!streamFetching) {
      dispatch(startFetchingStream());
      fetchMyStream()
        .then(transform)
        .then(normalizeTracks)
        .then((normalized) => {
          dispatch(receiveStream(normalized));
        })
        .catch((err) => {
          console.error(err);
          dispatch(defaultWarning());
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
      makeRequest(curNextHref)
        .then(transform)
        .then(normalizeTracks)
        .then((normalized) => {
          dispatch(receiveStream(normalized));
        })
        .catch((err) => {
          console.error(err);
          dispatch(defaultWarning());
        });
    }
  };
}

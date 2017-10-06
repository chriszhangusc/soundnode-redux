import { mergeEntities } from 'features/entities/entitiesActions';
import {
  mergeVisiblePlayQueue,
  updateVisiblePlayQueueName,
} from 'features/playQueue/playQueueActions';
import {
  showLoadingOverlay,
  hideLoadingOverlay,
} from 'features/globalOverlayLoader/globalOverlayLoaderActions';
import { fetchProfiledTrack, fetchTrackComments, fetchMoreComments } from './trackProfileApi';
import { getCommentsNextHref, isCommentsFetching } from './trackProfileSelectors';
import * as types from './trackProfileActionTypes';

export const resetTrackProfileState = () => ({
  type: types.TRACK_PROFILE_STATE_RESET,
});

export function startFetchingProfiledTrack() {
  return { type: types.TRACK_PROFILE_TRACK_FETCH_START };
}

export function stopFetchingProfiledTrack() {
  return { type: types.TRACK_PROFILE_TRACK_FETCH_STOP };
}

export function updateProfiledTrack(trackId) {
  return {
    type: types.TRACK_PROFILE_TRACK_UPDATE,
    payload: {
      trackId,
    },
  };
}

export function failedToFetchTrack() {
  return {
    type: types.TRACK_PROFILE_TRACK_FAIL,
  };
}

export function startFetchingComments() {
  return { type: types.TRACK_PROFILE_COMMENTS_FETCH_START };
}

export function stopFetchingComments() {
  return { type: types.TRACK_PROFILE_COMMENTS_FETCH_STOP };
}

export function appendComments(commentIds) {
  return {
    type: types.TRACK_PROFILE_COMMENTS_APPEND,
    payload: {
      commentIds,
    },
  };
}

export function updateCommentsNextHref(commentsNextHref) {
  return {
    type: types.TRACK_PROFILE_COMMENTS_NEXT_HREF_UPDATE,
    payload: {
      commentsNextHref,
    },
  };
}

export function failedToFetchComments() {
  return {
    type: types.TRACK_PROFILE_COMMENTS_FAIL,
  };
}

export function receiveComments(normalized) {
  return (dispatch) => {
    const { entities, result, nextHref } = normalized;
    dispatch(mergeEntities(entities));
    dispatch(appendComments(result));
    dispatch(updateCommentsNextHref(nextHref));
    dispatch(stopFetchingComments());
  };
}

export function receiveTrack(normalizedTrack) {
  return (dispatch) => {
    dispatch(mergeEntities(normalizedTrack.entities));
    dispatch(updateProfiledTrack(normalizedTrack.result));
    // Update playlist
    dispatch(mergeVisiblePlayQueue([normalizedTrack.result]));
    dispatch(stopFetchingProfiledTrack());
  };
}

// Initial loading method
export function loadTrackProfileData(trackId) {
  return (dispatch) => {
    dispatch(updateVisiblePlayQueueName(`track-${trackId}`));
    dispatch(startFetchingProfiledTrack());
    dispatch(startFetchingComments());
    dispatch(showLoadingOverlay());
    Promise.all([fetchProfiledTrack(trackId), fetchTrackComments(trackId)])
      .then((res) => {
        const normalizedTrack = res[0];
        const normalizedComments = res[1];
        dispatch(receiveTrack(normalizedTrack));
        dispatch(receiveComments(normalizedComments));
        dispatch(hideLoadingOverlay());
      })
      .catch((err) => {
        dispatch(failedToFetchTrack());
        dispatch(failedToFetchComments());
        console.log(err);
      });
  };
}

export function loadMoreComments() {
  return (dispatch, getState) => {
    const state = getState();
    const commentsNextHref = getCommentsNextHref(state);
    const commentsFetching = isCommentsFetching(state);
    if (!commentsFetching && commentsNextHref) {
      dispatch(startFetchingComments());
      fetchMoreComments(commentsNextHref)
        .then((normalized) => {
          dispatch(receiveComments(normalized));
        })
        .catch((err) => {
          dispatch(failedToFetchComments());
          console.log(err);
        });
    }
  };
}

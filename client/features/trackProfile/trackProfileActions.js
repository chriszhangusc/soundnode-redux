import { defaultWarning } from 'features/notification/notificationActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import {
  showLoadingOverlay,
  hideLoadingOverlay,
} from 'features/loadingOverlay/loadingOverlayActions';
import { fetchTrackById } from 'common/api/trackApi';
import { normalizeTrack, normalizeComments } from 'common/utils/normalizeUtils';
import { fetchCommentsByTrackId } from 'common/api/commentApi';
import { makeRequest } from 'common/utils/apiUtils';
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
    dispatch(stopFetchingProfiledTrack());
  };
}

// Initial loading method
export function loadTrackProfileData(trackId) {
  return (dispatch) => {
    dispatch(startFetchingProfiledTrack());
    dispatch(startFetchingComments());
    dispatch(showLoadingOverlay());
    fetchTrackById(trackId)
      .then((trackResponse) => {
        dispatch(receiveTrack(normalizeTrack(trackResponse)));
        return fetchCommentsByTrackId(trackId, 20);
      })
      .then((commentsResponse) => {
        dispatch(receiveComments(normalizeComments(commentsResponse)));
        dispatch(hideLoadingOverlay());
      })
      .catch((err) => {
        dispatch(defaultWarning());
        dispatch(stopFetchingProfiledTrack());
        dispatch(stopFetchingComments());
        dispatch(hideLoadingOverlay());
        console.error(err);
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
      makeRequest(commentsNextHref)
        .then(normalizeComments)
        .then((normalized) => {
          dispatch(receiveComments(normalized));
        })
        .catch((err) => {
          dispatch(stopFetchingComments());
          console.error(err);
          dispatch(defaultWarning());
        });
    }
  };
}

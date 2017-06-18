import { fetchProfiledTrack, fetchTrackComments, fetchMoreComments } from './trackProfileApi';
import { getCommentsNextHref, isCommentsFetching } from './trackProfileSelectors';
import {
  TRACK_PROFILE_TRACK_REQUEST,
  TRACK_PROFILE_TRACK_RECEIVED,
  TRACK_PROFILE_TRACK_FAILED,
  TRACK_PROFILE_COMMENTS_REQUEST,
  TRACK_PROFILE_COMMENTS_RECEIVED,
  TRACK_PROFILE_COMMENTS_FAILED,
  TRACK_PROFILE_STATE_CLEAR,
} from './trackProfileConsts';

export const clearTrackState = () => ({
  type: TRACK_PROFILE_STATE_CLEAR,
});

export function requestTrack() {
  return { type: TRACK_PROFILE_TRACK_REQUEST };
}

export function receiveTrack(normalized) {
  return {
    type: TRACK_PROFILE_TRACK_RECEIVED,
    payload: {
      ...normalized,
      trackId: normalized.result,
    },
  };
}

export function failedToFetchTrack() {
  return {
    type: TRACK_PROFILE_TRACK_FAILED,
  };
}

export function requestComments() {
  return { type: TRACK_PROFILE_COMMENTS_REQUEST };
}

export function receiveComments(normalized) {
  return {
    type: TRACK_PROFILE_COMMENTS_RECEIVED,
    payload: {
      ...normalized,
      commentIds: normalized.result,
    },
  };
}

export function failedToFetchComments() {
  return {
    type: TRACK_PROFILE_COMMENTS_FAILED,
  };
}

export function loadTrackProfilePage(trackId) {
  return (dispatch) => {
    dispatch(requestTrack());
    dispatch(requestComments());
    Promise.all([fetchProfiledTrack(trackId), fetchTrackComments(trackId)])
      .then((res) => {
        const track = res[0];
        const comments = res[1];
        dispatch(receiveTrack(track));
        dispatch(receiveComments(comments));
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
      dispatch(requestComments());
      fetchMoreComments(commentsNextHref)
        .then((normalizedComments) => {
          dispatch(receiveComments(normalizedComments));
        })
        .catch((err) => {
          dispatch(failedToFetchComments());
          console.log(err);
        });
    }
  };
}

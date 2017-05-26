import { fetchTrack, fetchComments } from 'client/common/api/sc/v1';
import { getCommentsNextHref } from './trackProfileSelectors';
import {
  TRACK_REQUEST,
  TRACK_RECEIVE,
  COMMENTS_REQUEST,
  COMMENTS_RECEIVE,
  TRACK_PROFILE_STATE_CLEAR,
} from './trackProfileConsts';

export const clearTrackState = () => ({
  type: TRACK_PROFILE_STATE_CLEAR,
});

export function requestTrack() {
  return { type: TRACK_REQUEST };
}

export function requestComments() {
  return { type: COMMENTS_REQUEST };
}

export function receiveTrack(normalized) {
  return {
    type: TRACK_RECEIVE,
    payload: normalized,
  };
}

export function receiveComments(normalized) {
  return {
    type: COMMENTS_RECEIVE,
    payload: normalized,
  };
}

export function loadTrackProfilePage(trackId) {
  return (dispatch, getState) => {
    console.log('Load Track Profile Page Data');
    const commentsNextHref = getCommentsNextHref(getState());
    dispatch(requestTrack());
    dispatch(requestComments());
    Promise.all([fetchTrack(trackId), fetchComments(trackId, commentsNextHref)])
      .then((res) => {
        const track = res[0];
        const comments = res[1];
        dispatch(receiveTrack(track));
        dispatch(receiveComments(comments));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function fetchMoreComments() {
  return (dispatch, getState) => {
    const state = getState();
    const commentsNextHref = getCommentsNextHref(state);
    console.log(commentsNextHref);
    if (!commentsNextHref) return;
    dispatch(requestComments());
    console.log(commentsNextHref);
    fetchComments(null, commentsNextHref)
      .then((comments) => {
        dispatch(receiveComments(comments));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

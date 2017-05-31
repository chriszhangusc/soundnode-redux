import { makeRequestAndNormalize } from 'client/common/utils/apiUtils';
import { commentArraySchema } from 'client/app/schema';
import { fetchProfiledTrack, fetchTrackComments } from './trackProfileApi';
import { getCommentsNextHref, isCommentsFetching } from './trackProfileSelectors';
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
        console.log(err);
      });
  };
}

export function loadMoreComments() {
  return (dispatch, getState) => {
    const state = getState();
    const commentsNextHref = getCommentsNextHref(state);
    if (!isCommentsFetching && commentsNextHref) {
      dispatch(requestComments());
      makeRequestAndNormalize(commentsNextHref, commentArraySchema)
        .then((comments) => {
          dispatch(receiveComments(comments));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}

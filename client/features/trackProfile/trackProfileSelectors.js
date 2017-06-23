import { createSelector } from 'reselect';
import { getTracks } from 'client/features/entities/entitiesSelectors';

const getState = state => state.trackProfile;

export const getProfiledTrackId = createSelector(getState, state => state.trackId);

export const getProfiledTrack = createSelector(
  getTracks,
  getProfiledTrackId,
  (users, userId) => userId && users[userId.toString()],
);

export const isTrackFetching = createSelector(getState, state => state.trackFetching);

export const getCommentIds = createSelector(getState, state => state.commentIds);
export const getCommentsNextHref = createSelector(getState, state => state.commentsNextHref);
export const isCommentsFetching = createSelector(getState, state => state.commentsFetching);

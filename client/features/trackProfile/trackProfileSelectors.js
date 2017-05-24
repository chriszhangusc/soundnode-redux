// State
// const INITIAL_STATE = {
//   trackFetching: false,
//   commentsFetching: false,
//   trackId: null,
//   commentIds: [],
//   commentsNextHref: null,
// };

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

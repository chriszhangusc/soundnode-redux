import { createSelector } from 'reselect';
import { getUsers } from 'client/features/entities/entitiesSelectors';

const getState = state => state.userProfile;

export const getProfiledUserId = createSelector(getState, state => state.userId);

export const getProfiledUser = createSelector(
  getUsers,
  getProfiledUserId,
  (users, userId) => userId && users[String(userId)],
);

export const getProfiledUserTrackIds = createSelector(getState, state => state.trackIds);

export const isUserFetching = createSelector(getState, state => state.userFetching);

export const isUserTracksFetching = createSelector(getState, state => state.tracksFetching);

export const getUserTracksNextHref = createSelector(getState, state => state.tracks.tracksNextHref);

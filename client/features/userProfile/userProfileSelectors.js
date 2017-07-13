import { createSelector } from 'reselect';
import { getUsers as getAllUsers } from 'features/entities/entitiesSelectors';

const getState = state => state.userProfile;

export const getProfiledUserId = createSelector(getState, state => state.userId);

export const getProfiledUser = createSelector(
  getAllUsers,
  getProfiledUserId,
  (users, userId) => userId && users[String(userId)],
);

export const getFollowersCount = createSelector(
  getProfiledUser,
  user => user && user.followersCount.toLocaleString(),
);

export const getProfiledUserTrackIds = createSelector(getState, state => state.trackIds);

export const isUserFetching = createSelector(getState, state => state.userFetching);

export const isUserTracksFetching = createSelector(getState, state => state.tracksFetching);

export const isPageLoading = createSelector(
  isUserFetching,
  isUserTracksFetching,
  (userFetching, tracksFetching) => userFetching || tracksFetching,
);

export const getUserTracksNextHref = createSelector(getState, state => state.tracksNextHref);

import { createSelector } from 'reselect';
import { getTracks, getUsers } from 'features/entities/entitiesSelectors';
import { getLargeVersion } from 'common/utils/imageUtils';
import { getActiveTrackId, isPlayerPlaying } from 'features/player/playerSelectors';
import { getFavoriteTrackIds } from 'features/auth/authSelectors';
import { USER_PROFILE_ROUTE } from 'common/constants/routeConsts';

const getState = state => state.trackProfile;

export const getProfiledTrackId = createSelector(getState, state => state.trackId);

export const getProfiledTrack = createSelector(
  getTracks,
  getProfiledTrackId,
  (tracks, trackId) => trackId && tracks[trackId.toString()],
);

export const isTrackFetching = createSelector(getState, state => state.trackFetching);

export const getCommentIds = createSelector(getState, state => state.commentIds);
export const getCommentsNextHref = createSelector(getState, state => state.commentsNextHref);
export const isCommentsFetching = createSelector(getState, state => state.commentsFetching);

export const isPageLoading = createSelector(
  isTrackFetching,
  isCommentsFetching,
  (trackFetching, commentsFetching) => trackFetching && commentsFetching,
);

export const isProfiledTrackDownloadable = createSelector(
  getProfiledTrack,
  track => track && track.downloadable,
);

export const getProfiledTrackDownloadUrl = createSelector(
  getProfiledTrack,
  track => track && track.downloadUrl,
);

export const getProfiledTrackPermalink = createSelector(
  getProfiledTrack,
  track => track && track.permalinkUrl,
);

export const getProfiledTrackArtworkUrl = createSelector(
  getProfiledTrack,
  track => track && getLargeVersion(track.artworkUrl),
);

export const isProfiledTrackActive = createSelector(
  getProfiledTrackId,
  getActiveTrackId,
  (trackId, activeTrackId) => trackId === activeTrackId,
);

export const isProfiledTrackPlaying = createSelector(
  isProfiledTrackActive,
  isPlayerPlaying,
  (active, playing) => active && playing,
);

export const isProfiledTrackLiked = createSelector(
  getProfiledTrackId,
  getFavoriteTrackIds,
  (trackId, favoritesIds) => favoritesIds && favoritesIds.includes(trackId),
);

export const getProfiledTrackLikesCount = createSelector(
  getProfiledTrack,
  // Since we are using both SC v1 and v2 api, the object structures are different..
  track => track && (track.favoritingsCount || track.likesCount).toLocaleString(),
);

export const getProfiledTrackPlaybackCount = createSelector(
  getProfiledTrack,
  track => track && track.playbackCount.toLocaleString(),
);

export const getProfiledTrackTitle = createSelector(
  getProfiledTrack,
  track => track && track.title,
);

export const getProfiledTrackDescription = createSelector(
  getProfiledTrack,
  track => track && track.description,
);

export const getProfiledTrackUserId = createSelector(
  getProfiledTrack,
  track => track && track.userId,
);

export const getProfiledTrackUserRoute = createSelector(
  getProfiledTrackUserId,
  userId => `${USER_PROFILE_ROUTE}/${userId}`,
);

export const getProfiledTrackUser = createSelector(
  getProfiledTrackUserId,
  getUsers,
  (userId, users) => userId && users[userId.toString()],
);

export const getProfiledTrackUsername = createSelector(
  getProfiledTrackUser,
  user => user && user.username,
);

export const getProfiledTrackCommentCount = createSelector(
  getProfiledTrack,
  track => track && track.commentCount,
);

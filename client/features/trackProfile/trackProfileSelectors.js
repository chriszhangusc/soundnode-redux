import { createSelector } from 'reselect';
import { getTracks } from 'features/entities/entitiesSelectors';
import { getLargeVersion } from 'common/utils/imageUtils';
import { getActiveTrackId, isPlayerPlaying } from 'features/player/playerSelectors';
import { getFavoriteTrackIds } from 'features/auth/authSelectors';

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

export const isPageLoading = createSelector(
  isTrackFetching,
  isCommentsFetching,
  (trackFetching, commentsFetching) => trackFetching && commentsFetching,
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

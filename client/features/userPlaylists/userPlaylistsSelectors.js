import { createSelector } from 'reselect';

export const getUserPlaylistsState = state => state.userPlaylists;
export const getUserPlaylistIds = createSelector(getUserPlaylistsState, state => state.playlistIds);
export const isUserPlaylistsFetching = createSelector(
  getUserPlaylistsState,
  state => state.fetching,
);

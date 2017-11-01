import { createSelector } from 'reselect';

export const getSearchState = state => state.search;

export const isSearching = createSelector(getSearchState, state => state.searching);
export const getSearchTrackIds = createSelector(getSearchState, state => state.trackIds);
// export const getUserResults = createSelector(getSearchState, state => state.userIds);

export const getSearchKey = createSelector(getSearchState, state => state.searchKey);

export const getSearchPlaylistName = createSelector(getSearchKey, key => `search-${key}`);
export const getSearchPlaylistTitle = createSelector(getSearchKey, key => key && key.toUpperCase());

export const getSearchPlaylist = createSelector(
  getSearchTrackIds,
  getSearchPlaylistName,
  getSearchPlaylistTitle,
  (trackIds = [], name = '', title = '') => ({
    name,
    title,
    trackIds,
  }),
);

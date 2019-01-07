import { createSelector } from 'reselect';

export const getFavoritesState = state => state.favorites;

export const getFavoritesIds = createSelector(getFavoritesState, state => state.favoriteIds);

export const isFavoritesFetching = createSelector(getFavoritesState, state => state.fetching);

export const getFavoritesNextHref = createSelector(getFavoritesState, state => state.nextHref);

// #FIXME: favorites-${myId}
export const getFavoritesPlaylistName = () => 'favorites';
export const getFavoritesPlaylistTitle = () => 'Favorites';

export const getFavoritesPlaylist = createSelector(
  getFavoritesPlaylistName,
  getFavoritesPlaylistTitle,
  getFavoritesIds,
  (name, title, trackIds) => ({
    name: name || '',
    title: title || '',
    trackIds: trackIds || [],
  }),
);

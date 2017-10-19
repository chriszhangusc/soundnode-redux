import { createSelector } from 'reselect';

export const getFavoritesState = state => state.favorites;

export const getFavoriteIds = createSelector(getFavoritesState, state => state.favoriteIds);

export const isFavoritesFetching = createSelector(getFavoritesState, state => state.fetching);

export const getFavoritesNextHref = createSelector(getFavoritesState, state => state.nextHref);

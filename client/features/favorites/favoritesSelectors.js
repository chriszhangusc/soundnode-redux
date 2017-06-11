import { createSelector } from 'reselect';

export const getFavoritesState = state => state.favorites;

export const getFavoritesIds = createSelector(getFavoritesState, state => state.favoritesIds);

export const isFavoritesFetching = createSelector(getFavoritesState, state => state.fetching);

export const getFavoritesNextHref = createSelector(getFavoritesState, state => state.nextHref);

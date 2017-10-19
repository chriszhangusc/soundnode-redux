import { createSelector } from 'reselect';

export const getFavoritesState = state => state.favorites;

export const getFavoriteTrackIds = createSelector(getFavoritesState, state => state.trackIds);

export const isFavoritesFetching = createSelector(getFavoritesState, state => state.fetching);

export const getFavoritesNextHref = createSelector(getFavoritesState, state => state.nextHref);

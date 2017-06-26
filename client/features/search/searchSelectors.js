import { createSelector } from 'reselect';

export const getSearchState = state => state.search;

export const isSearching = createSelector(getSearchState, state => state.searching);
export const getTrackResults = createSelector(getSearchState, state => state.trackIds);
export const getUserResults = createSelector(getSearchState, state => state.userIds);
export const getSearchNextHref = createSelector(getSearchState, state => state.nextHref);

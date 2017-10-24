import { createSelector } from 'reselect';

export const getState = state => state.modals.addToPlaylist;

export const getFilterText = createSelector(getState, state => state.filterText);
export const getRequestQueue = createSelector(getState, state => state.requestQueue);

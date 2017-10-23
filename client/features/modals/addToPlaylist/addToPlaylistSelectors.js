import { createSelector } from 'reselect';

export const getState = state => state.modals.addToPlaylist;

export const getFilterText = createSelector(getState, state => state.filterText);

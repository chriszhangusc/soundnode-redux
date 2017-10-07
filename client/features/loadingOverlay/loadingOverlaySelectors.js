import { createSelector } from 'reselect';

export const getState = state => state.loadingOverlay;

export const isLoaderActive = createSelector(getState, state => state.active);

export const getLoaderText = createSelector(getState, state => state.text);

import { createSelector } from 'reselect';

export const getState = state => state.ui.navProgress;

export const isNavProgressLoading = createSelector(
  getState,
  state => state.loading,
);

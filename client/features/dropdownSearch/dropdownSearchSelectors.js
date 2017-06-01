import { createSelector } from 'reselect';

export const getDropdownSearchState = state => state.dropdownSearch;

export const isDropdownSearching = createSelector(
  getDropdownSearchState,
  state => state.fetching,
);

export const isDropdownSearchResultsHidden = createSelector(
  getDropdownSearchState,
  state => state.hidden,
);

export const getDropdownSearchUserIds = createSelector(
  getDropdownSearchState,
  state => state.userIds,
);

export const getDropdownSearchTrackIds = createSelector(
  getDropdownSearchState,
  state => state.trackIds,
);

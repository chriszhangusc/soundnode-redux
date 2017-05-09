import { createSelector } from 'reselect';

export const getDropdownSearchState = state => state.dropdownSearch;

export const isDropdownSearching = createSelector(
  getDropdownSearchState,
  state => state.dropdownFetching,
);

export const isDropdownShown = createSelector(
  getDropdownSearchState,
  state => state.dropdownShown,
);

export const getDropdownSearchArtistIds = createSelector(
  getDropdownSearchState,
  state => state.dropdownArtistIds,
);

export const getDropdownSearchTrackIds = createSelector(
  getDropdownSearchState,
  state => state.dropdownTrackIds,
);

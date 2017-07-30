import { createSelector } from 'reselect';
import { SEARCH_ROUTE } from 'common/constants/routeConsts';

const resultLimit = 4;

export const getDropdownSearchState = state => state.dropdownSearch;

export const isDropdownSearching = createSelector(getDropdownSearchState, state => state.fetching);

export const isDropdownSearchResultsHidden = createSelector(
  getDropdownSearchState,
  state => state.hidden,
);

export const getDropdownSearchUserIds = createSelector(getDropdownSearchState, state =>
  state.userIds.slice(0, resultLimit),
);

export const getDropdownSearchTrackIds = createSelector(getDropdownSearchState, state =>
  state.trackIds.slice(0, resultLimit),
);

export const getDropdownSearchQuery = createSelector(getDropdownSearchState, state => state.query);

export const getDropdownSearchQueryLink = createSelector(
  getDropdownSearchQuery,
  query => `${SEARCH_ROUTE}/${query}`,
);


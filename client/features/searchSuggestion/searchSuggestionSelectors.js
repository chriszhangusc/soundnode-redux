import { createSelector } from 'reselect';
import { SEARCH_ROUTE } from 'common/constants/routeConsts';

const resultLimit = 4;

export const getSearchSuggestionState = state => state.searchSuggestion;

export const isSearchSuggestionFetching = createSelector(
  getSearchSuggestionState,
  state => state.fetching,
);

export const isSearchSuggestionResultsHidden = createSelector(
  getSearchSuggestionState,
  state => state.hidden,
);

export const getSearchSuggestionUserIds = createSelector(getSearchSuggestionState, state =>
  state.userIds.slice(0, resultLimit),
);

export const getSearchSuggestionTrackIds = createSelector(getSearchSuggestionState, state =>
  state.trackIds.slice(0, resultLimit),
);

export const getSearchSuggestionQuery = createSelector(
  getSearchSuggestionState,
  state => state.query,
);

export const getSearchSuggestionQueryLink = createSelector(
  getSearchSuggestionQuery,
  query => `${SEARCH_ROUTE}/${query}`,
);

import * as types from 'features/dropdownSearch/dropdownSearchConsts';

/* Reducers */
const initialState = {
  query: undefined,
  hidden: true,
  fetching: false,
  userIds: [],
  trackIds: [],
};

export function startDropdownSearch(state) {
  return {
    ...state,
    fetching: true,
  };
}

export function stopDropdownSearch(state) {
  return {
    ...state,
    fetching: false,
  };
}

export function updateUserResults(state, { userIds }) {
  return {
    ...state,
    userIds: [...userIds],
  };
}

export function updateTrackResults(state, { trackIds }) {
  return {
    ...state,
    trackIds: [...trackIds],
  };
}

export function hideDropdownSearchResults(state) {
  return {
    ...state,
    hidden: true,
  };
}

export function showDropdownSearchResults(state) {
  return {
    ...state,
    hidden: false,
  };
}

export function clearDropdownSearchResults(state) {
  return {
    ...state,
    userIds: [],
    trackIds: [],
  };
}

export function updateDropdownSearchQuery(state, { query }) {
  return {
    ...state,
    query,
  };
}

export default function dropdownSearchReducer(state = initialState, action) {
  switch (action.type) {
    case types.DROPDOWN_SEARCH_START:
      return startDropdownSearch(state);

    case types.DROPDOWN_SEARCH_STOP:
      return stopDropdownSearch(state);

    case types.DROPDOWN_SEARCH_FAIL:
      return stopDropdownSearch(state);

    case types.DROPDOWN_SEARCH_USER_RESULTS_UPDATE:
      return updateUserResults(state, action.payload);

    case types.DROPDOWN_SEARCH_TRACK_RESULTS_UPDATE:
      return updateTrackResults(state, action.payload);

    case types.DROPDOWN_SEARCH_RESULTS_HIDE:
      return hideDropdownSearchResults(state);

    case types.DROPDOWN_SEARCH_RESULTS_SHOW:
      return showDropdownSearchResults(state);

    case types.DROPDOWN_SEARCH_RESULTS_CLEAR:
      return clearDropdownSearchResults(state);

    case types.DROPDOWN_SEARCH_QUERY_UPDATE:
      return updateDropdownSearchQuery(state, action.payload);

    default:
      return state;
  }
}

import * as TYPES from 'client/features/dropdownSearch/dropdownSearchConsts';

/* Reducers */
const INITIAL_STATE = {
  hidden: true,
  fetching: false,
  userIds: [],
  trackIds: [],
};

export function requestDropdownSearch(state) {
  return {
    ...state,
    fetching: true,
  };
}

export function endDropdownSearch(state) {
  return {
    ...state,
    fetching: false,
  };
}

export function receiveUsers(state, { userIds }) {
  return {
    ...state,
    userIds: [...userIds],
  };
}

export function receiveTracks(state, { trackIds }) {
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

export default function dropdownSearchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.DROPDOWN_SEARCH_REQUEST:
      return requestDropdownSearch(state);

    case TYPES.DROPDOWN_SEARCH_END:
      return endDropdownSearch(state);

    case TYPES.DROPDOWN_SEARCH_FAILED:
      return endDropdownSearch(state);

    case TYPES.DROPDOWN_SEARCH_USERS_RECEIVED:
      return receiveUsers(state, action.payload);

    case TYPES.DROPDOWN_SEARCH_TRACKS_RECEIVED:
      return receiveTracks(state, action.payload);

    case TYPES.DROPDOWN_SEARCH_RESULTS_HIDE:
      return hideDropdownSearchResults(state);

    case TYPES.DROPDOWN_SEARCH_RESULTS_SHOW:
      return showDropdownSearchResults(state);

    case TYPES.DROPDOWN_SEARCH_RESULTS_CLEAR:
      return clearDropdownSearchResults(state);

    default:
      return state;
  }
}

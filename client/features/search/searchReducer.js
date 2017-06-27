import * as types from './searchConsts';

/* Reducers */
const initialState = {
  searchType: undefined,
  nextHref: undefined,
  searching: false,
  // trackIds: [],
};

export function startSearching(state) {
  return {
    ...state,
    searching: true,
  };
}

export function stopSearching(state) {
  return {
    ...state,
    searching: false,
  };
}

export function resetSearchState(initState) {
  return {
    ...initState,
  };
}

export function updateNextHref(state, { nextHref }) {
  return {
    ...state,
    nextHref,
  };
}

export default function dropdownSearchReducer(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_START:
      return startSearching(state);

    case types.SEARCH_STOP:
      return stopSearching(state);

    case types.SEARCH_NEXT_HREF_UPDATE:
      return updateNextHref(state, action.payload);

    case types.SEARCH_STATE_RESET:
      return resetSearchState(initialState);

    default:
      return state;
  }
}

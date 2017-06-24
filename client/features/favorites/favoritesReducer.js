import * as types from './favoritesConsts.js';

const initialState = {
  fetching: false,
  favoritesIds: [],
  nextHref: null,
};

export function startFetchingFavorites(state) {
  return {
    ...state,
    fetching: true,
  };
}

export function updateFavorites(state, { trackIds }) {
  return {
    ...state,
    favoritesIds: [...trackIds],
  };
}

export function appendFavorites(state, { trackIds }) {
  return {
    ...state,
    favoritesIds: [...state.favoritesIds, ...trackIds],
  };
}

export function resetFavoritesState() {
  return {
    ...initialState,
  };
}

export function stopFetchingFavorites(state) {
  return {
    ...state,
    fetching: false,
  };
}

export function updateFavoritesNextHref(state, { nextHref }) {
  return {
    ...state,
    nextHref,
  };
}

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case types.FAVORITES_FETCH_START:
      return startFetchingFavorites(state);

    case types.FAVORITES_UPDATE:
      return updateFavorites(state, action.payload);

    case types.FAVORITES_APPEND:
      return appendFavorites(state, action.payload);

    case types.FAVORITES_NEXT_HREF_UPDATE:
      return updateFavoritesNextHref(state, action.payload);

    case types.FAVORITES_FETCH_STOP:
      return stopFetchingFavorites(state);

    case types.FAVORITES_STATE_RESET:
      return resetFavoritesState();

    default:
      return state;
  }
}

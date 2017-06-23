import * as types from './favoritesConsts.js';

const initialState = {
  fetching: false,
  favoritesIds: [],
  nextHref: null,
};

export function requestFavorites(state) {
  return {
    ...state,
    fetching: true,
  };
}

export function setFavorites(state, { favoritesIds, nextHref }) {
  return {
    ...state,
    favoritesIds: [...favoritesIds],
    nextHref,
  };
}

export function appendFavorites(state, { favoritesIds, nextHref }) {
  return {
    ...state,
    favoritesIds: [...state.favoritesIds, ...favoritesIds],
    nextHref,
  };
}

export function clearFavoritesState() {
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

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case types.FAVORITES_REQUEST:
      return requestFavorites(state);

    case types.FAVORITES_SET:
      return setFavorites(state, action.payload);

    case types.FAVORITES_APPEND:
      return appendFavorites(state, action.payload);

    case types.FAVORITES_FETCH_STOP:
      return stopFetchingFavorites(state);

    case types.FAVORITES_STATE_CLEAR:
      return clearFavoritesState();

    default:
      return state;
  }
}

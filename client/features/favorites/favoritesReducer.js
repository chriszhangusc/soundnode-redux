import {
  FAVORITES_REQUEST,
  FAVORITES_SET,
  FAVORITES_APPEND,
  FAVORITES_STATE_CLEAR,
} from './favoritesConsts.js';

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
    fetching: false,
    favoritesIds: [...favoritesIds],
    nextHref,
  };
}

export function appendFavorites(state, { favoritesIds, nextHref }) {
  return {
    ...state,
    fetching: false,
    favoritesIds: [...state.favorites, ...favoritesIds],
    nextHref,
  };
}

export function clearFavoritesState() {
  return {
    ...initialState,
  };
}

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case FAVORITES_REQUEST:
      return requestFavorites(state);

    case FAVORITES_SET:
      return setFavorites(state, action.payload);

    case FAVORITES_APPEND:
      return appendFavorites(state, action.payload);

    case FAVORITES_STATE_CLEAR:
      return clearFavoritesState();

    default:
      return state;
  }
}

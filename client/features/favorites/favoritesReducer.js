import { createReducer } from 'common/utils/reducerUtils';
import { mergeArrays } from 'common/utils/generalUtils';
import * as types from './favoritesActionTypes';

const initialState = {
  fetching: false,
  favoriteIds: [],
  nextHref: null,
};

export function startFetchingFavorites(state) {
  return {
    ...state,
    fetching: true,
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

export function mergeFavorites(state, { favoriteIds }) {
  return {
    ...state,
    favoriteIds: mergeArrays(state.favoriteIds, favoriteIds),
  };
}

export default createReducer(initialState, {
  [types.FAVORITES_FETCH_START]: startFetchingFavorites,
  [types.FAVORITES_NEXT_HREF_UPDATE]: updateFavoritesNextHref,
  [types.FAVORITES_FETCH_STOP]: stopFetchingFavorites,
  [types.FAVORITES_MERGE]: mergeFavorites,
  [types.FAVORITES_STATE_RESET]: resetFavoritesState,
});

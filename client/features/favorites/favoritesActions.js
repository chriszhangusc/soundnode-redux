import {
  FAVORITES_REQUEST,
  FAVORITES_SET,
  FAVORITES_APPEND,
  FAVORITES_STATE_CLEAR,
} from './favoritesConsts';
import { fetchMyFavorites, fetchFavoritesByNextHref } from './favoritesApi';
import { getFavoritesNextHref, isFavoritesFetching } from './favoritesSelectors';

export function requestFavorites() {
  return {
    type: FAVORITES_REQUEST,
  };
}

export function setFavorites({ result, entities, nextHref }) {
  return {
    type: FAVORITES_SET,
    payload: {
      favoritesIds: result,
      entities,
      nextHref,
    },
  };
}

export function appendFavorites({ result, entities, nextHref }) {
  return {
    type: FAVORITES_APPEND,
    payload: {
      favoritesIds: result,
      entities,
      nextHref,
    },
  };
}

export function clearFavoritesState() {
  return {
    type: FAVORITES_STATE_CLEAR,
  };
}

export function loadFavorites() {
  return (dispatch) => {
    dispatch(requestFavorites());
    fetchMyFavorites().then((normalized) => {
      dispatch(setFavorites(normalized));
    });
  };
}

// Not done
export function loadMoreFavorites() {
  return (dispatch, getState) => {
    const state = getState();
    const nextHref = getFavoritesNextHref(state);
    const fetching = isFavoritesFetching(state);
    if (!fetching && nextHref) {
      dispatch(requestFavorites());
      fetchFavoritesByNextHref(nextHref).then((normalized) => {
        dispatch(appendFavorites(normalized));
      });
    }
  };
}

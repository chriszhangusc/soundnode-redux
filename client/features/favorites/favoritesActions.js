import { mergeEntities } from 'features/entities/entitiesActions';
import { mergeActivePlayQueueIfNeeded } from 'features/playQueue/playQueueActions';
import * as types from './favoritesActionTypes';
import { fetchMyFavorites, fetchFavoritesByNextHref } from './favoritesApi';
import { getFavoritesNextHref, isFavoritesFetching } from './favoritesSelectors';

export function startFetchingFavorites() {
  return {
    type: types.FAVORITES_FETCH_START,
  };
}

export function stopFetchingFavorites() {
  return {
    type: types.FAVORITES_FETCH_STOP,
  };
}

export function updateFavoritesNextHref(nextHref) {
  return {
    type: types.FAVORITES_NEXT_HREF_UPDATE,
    payload: {
      nextHref,
    },
  };
}

export function resetFavoritesState() {
  return {
    type: types.FAVORITES_STATE_RESET,
  };
}

export function mergeFavorites(favoriteIds) {
  return {
    type: types.FAVORITES_MERGE,
    payload: {
      favoriteIds,
    },
  };
}

export function receiveFavorites(normalized) {
  return (dispatch) => {
    const { entities, nextHref, result } = normalized;
    dispatch(mergeEntities(entities));
    dispatch(updateFavoritesNextHref(nextHref));
    dispatch(mergeFavorites(result));
    // Dynamically update the play queue if needed
    dispatch(mergeActivePlayQueueIfNeeded(result, 'favorites'));
    dispatch(stopFetchingFavorites());
  };
}

export function loadFavorites() {
  return (dispatch) => {
    dispatch(startFetchingFavorites());
    fetchMyFavorites()
      .then((normalized) => {
        dispatch(receiveFavorites(normalized));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function loadMoreFavorites() {
  return (dispatch, getState) => {
    const state = getState();
    const curNextHref = getFavoritesNextHref(state);
    const fetching = isFavoritesFetching(state);
    if (!fetching && curNextHref) {
      dispatch(startFetchingFavorites());
      fetchFavoritesByNextHref(curNextHref)
        .then((normalized) => {
          dispatch(receiveFavorites(normalized));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
}

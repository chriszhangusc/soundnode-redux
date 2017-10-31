import { defaultWarning } from 'features/notification/notificationActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import { appendToPlayQueueIfNeeded } from 'features/playQueue/playQueueActions';
import { normalizeTracks } from 'common/utils/normalizeUtils';
import * as types from 'features/favorites/favoritesActionTypes';
import { makeRequest } from 'common/utils/apiUtils';
import { fetchMyFavorites } from 'common/api/meApi';
import { getFavoritesNextHref, isFavoritesFetching } from 'features/favorites/favoritesSelectors';

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
    dispatch(appendToPlayQueueIfNeeded(result, 'favorites'));
    dispatch(stopFetchingFavorites());
  };
}

export function loadFavorites() {
  return (dispatch) => {
    dispatch(startFetchingFavorites());
    fetchMyFavorites()
      .then(normalizeTracks)
      .then((normalized) => {
        dispatch(receiveFavorites(normalized));
      })
      .catch((err) => {
        console.error(err);
        dispatch(defaultWarning());
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
      makeRequest(curNextHref)
        .then(normalizeTracks)
        .then((normalized) => {
          dispatch(receiveFavorites(normalized));
        })
        .catch((err) => {
          console.error(err);
          dispatch(defaultWarning());
        });
    }
  };
}

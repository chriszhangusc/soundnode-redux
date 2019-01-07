import { defaultWarning } from '@soundnode-redux/client/src/features/notification/notificationActions';
import { mergeEntities } from '@soundnode-redux/client/src/features/entities/entitiesActions';
import { appendToPlayQueueIfNeeded } from '@soundnode-redux/client/src/features/playQueue/playQueueActions';
import { normalizeTracks } from '@soundnode-redux/client/src/common/utils/normalizeUtils';
import * as types from '@soundnode-redux/client/src/features/favorites/favoritesActionTypes';
import { makeRequest } from '@soundnode-redux/client/src/common/utils/apiUtils';
import { fetchMyFavorites } from '@soundnode-redux/client/src/common/api/meApi';
import { getFavoritesNextHref, isFavoritesFetching } from '@soundnode-redux/client/src/features/favorites/favoritesSelectors';

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
  return (dispatch, getState) => {
    const state = getState();
    const fetching = isFavoritesFetching(state);
    if (!fetching) {
      dispatch(startFetchingFavorites());
      fetchMyFavorites()
        .then(normalizeTracks)
        .then((normalized) => {
          dispatch(receiveFavorites(normalized));
        })
        .catch((err) => {
          console.error(err);
          dispatch(defaultWarning());
          dispatch(stopFetchingFavorites());
        });
    }
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
          dispatch(stopFetchingFavorites());
        });
    }
  };
}

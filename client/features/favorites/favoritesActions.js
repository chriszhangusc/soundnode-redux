import {
  updateVisiblePlaylistName,
  updateVisiblePlaylist,
  appendToVisiblePlaylist,
} from 'client/features/playlist/playlistActions';

import { mergeEntities } from 'client/features/entities/entitiesActions';
import * as types from './favoritesConsts';
import { fetchMyFavorites, fetchFavoritesByNextHref } from './favoritesApi';
import { getFavoritesNextHref, isFavoritesFetching } from './favoritesSelectors';

export function startFetchingFavorites() {
  return {
    type: types.FAVORITES_FETCH_START,
  };
}

export function updateFavorites(trackIds) {
  return {
    type: types.FAVORITES_UPDATE,
    payload: {
      trackIds,
    },
  };
}

export function appendFavorites(trackIds) {
  return {
    type: types.FAVORITES_APPEND,
    payload: {
      trackIds,
    },
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

export function loadFavorites() {
  return (dispatch) => {
    dispatch(startFetchingFavorites());
    fetchMyFavorites()
      .then((normalized) => {
        const { entities, nextHref, result } = normalized;
        dispatch(mergeEntities(entities));
        // Remove it because it is now moved to playlsit state?
        dispatch(updateFavorites(result));
        dispatch(updateFavoritesNextHref(nextHref));
        dispatch(updateVisiblePlaylistName('favorites'));
        dispatch(updateVisiblePlaylist(result));
        dispatch(stopFetchingFavorites());
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
          const { entities, nextHref, result } = normalized;
          dispatch(mergeEntities(entities));
          dispatch(appendFavorites(result));
          dispatch(updateFavoritesNextHref(nextHref));
          // Append new songs to the favorites/currently visible playlist
          dispatch(appendToVisiblePlaylist(result));
          dispatch(stopFetchingFavorites());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
}

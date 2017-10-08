import {
  showLoadingOverlay,
  hideLoadingOverlay,
} from 'features/loadingOverlay/loadingOverlayActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import { PLAYLISTS_MERGE, PLAYLISTS_STATE_RESET } from 'features/playlists/playlistsActionTypes';
import {
  notificationSuccess,
  notificationWarning,
} from 'features/notification/notificationActions';
import { fetchMyPlaylists, deleteMyPlaylist } from 'features/playlists/playlistsApi';

export function mergePlaylists(playlistIds) {
  return {
    type: PLAYLISTS_MERGE,
    payload: {
      playlistIds,
    },
  };
}

export function loadPlaylists() {
  return (dispatch) => {
    dispatch(showLoadingOverlay());
    fetchMyPlaylists().then((normalized) => {
      // console.log(normalized);
      const { entities, result } = normalized;
      // Merge entities
      dispatch(mergeEntities(entities));
      // Update playlists store
      dispatch(mergePlaylists(result));
      // Stop global spinner
      dispatch(hideLoadingOverlay());
    });
  };
}

export function deletePlaylist(playlistId) {
  return (dispatch) => {
    dispatch(showLoadingOverlay());
    deleteMyPlaylist(playlistId)
      .then(() => {
        console.log('success');
        // Reload playlists page
        dispatch(loadPlaylists());
        dispatch(hideLoadingOverlay());
        dispatch(notificationSuccess('Playlist deleted!'));
      })
      .catch((err) => {
        // notification warning
        dispatch(notificationWarning('Something went wrong!'));
        console.log(err);
      });
  };
}

export function resetPlaylistsState() {
  return {
    type: PLAYLISTS_STATE_RESET,
  };
}

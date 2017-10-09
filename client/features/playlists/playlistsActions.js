import {
  showLoadingOverlay,
  hideLoadingOverlay,
} from 'features/loadingOverlay/loadingOverlayActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import {
  PLAYLISTS_MERGE,
  PLAYLISTS_UPDATE,
  PLAYLISTS_STATE_RESET,
  PLAYLISTS_PLAYLIST_DELETE,
} from 'features/playlists/playlistsActionTypes';
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

export function updatePlaylists(playlistIds) {
  return {
    type: PLAYLISTS_UPDATE,
    payload: {
      playlistIds,
    },
  };
}


export function resetPlaylistsState() {
  return {
    type: PLAYLISTS_STATE_RESET,
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
      dispatch(updatePlaylists(result));
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
        // Sound cloud will not perform instand deletion.
        dispatch({
          type: PLAYLISTS_PLAYLIST_DELETE,
          payload: {
            playlistId,
          },
        });
        // dispatch(loadPlaylists());
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


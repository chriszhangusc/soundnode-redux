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
import {
  fetchMyPlaylists,
  fetchPlaylistByUserId,
  deleteSinglePlaylist,
} from 'features/playlists/playlistsApi';
import { getPlaylistById } from 'features/entities/entitiesSelectors';
import {
  updateActivePlayQueue,
  updateActivePlayQueueName,
} from 'features/playQueue/playQueueActions';
import { updateActiveTrackId, resetPrevSong, loadSong } from 'features/player/playerActions';
import { getMyId } from 'features/auth/authSelectors';

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
  return (dispatch, getState) => {
    dispatch(showLoadingOverlay());
    const state = getState();
    const myId = getMyId(state);
    console.log(myId);
    fetchPlaylistByUserId(myId).then((normalized) => {
      console.log(normalized);
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
    deleteSinglePlaylist(playlistId)
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

export function playPlaylist(playlistId) {
  return (dispatch, getState) => {
    const state = getState();
    const playlist = getPlaylistById(state, playlistId);
    const trackIds = playlist.tracks;
    dispatch(updateActivePlayQueueName(`playlist-${playlistId}`));
    dispatch(updateActivePlayQueue(trackIds));
    dispatch(updateActiveTrackId(trackIds[0]));
    dispatch(resetPrevSong());
    dispatch(loadSong());
    // dispatch(updateActiveTrackId(trackId));
    // dispatch(syncActivePlayQueue());
    // dispatch(resetPrevSong());
    // dispatch(loadSong());
    // 1. Player load start

    // 2. Update play queue with tracks of playlist

    // 3. Play first track of playlist
  };
}

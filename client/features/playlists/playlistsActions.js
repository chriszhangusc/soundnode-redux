import { normalizeResponse } from 'common/utils/normalizeUtils';
import { playlistArraySchema } from 'app/schema';

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
import { notificationSuccess, defaultWarning } from 'features/notification/notificationActions';
import { fetchMyPlaylists, deleteSinglePlaylist } from 'common/services/scApiService';
import { getPlaylistById } from 'features/entities/entitiesSelectors';
import { updatePlayQueue } from 'features/playQueue/playQueueActions';
import { loadTrackAndPlay } from 'features/player/playerActions';

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

export function fetchPlaylists() {
  return dispatch => fetchMyPlaylists()
      .then(response => normalizeResponse(response, playlistArraySchema))
      .then((normalized) => {
        const { entities, result } = normalized;
        // Merge entities
        dispatch(mergeEntities(entities));
        // Update playlists store
        dispatch(updatePlaylists(result));
      })
      .catch((err) => {
        // notification warning
        dispatch(defaultWarning());
        console.log(err);
      });
}

// Bussiness logic for playlists
export function loadPlaylists() {
  return (dispatch) => {
    dispatch(showLoadingOverlay());
    dispatch(fetchPlaylists()).then(() => {
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
        dispatch(notificationSuccess('Playlist will be deleted shortly'));
      })
      .catch((err) => {
        // notification warning
        dispatch(defaultWarning());
        console.log(err);
      });
  };
}

export function playPlaylist(playlistId, start = 0) {
  return (dispatch, getState) => {
    const state = getState();
    const { title, tracks } = getPlaylistById(state, playlistId);
    const playlist = {
      name: `playlists-${playlistId}`,
      title,
      trackIds: tracks,
    };
    dispatch(updatePlayQueue(playlist));
    dispatch(loadTrackAndPlay(tracks[start]));
  };
}

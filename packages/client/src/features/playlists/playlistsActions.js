import { normalizePlaylists } from '@soundnode-redux/client/src/common/utils/normalizeUtils';
import {
  showLoadingOverlay,
  hideLoadingOverlay,
} from '@soundnode-redux/client/src/features/loadingOverlay/loadingOverlayActions';
import { mergeEntities } from '@soundnode-redux/client/src/features/entities/entitiesActions';
import {
  PLAYLISTS_MERGE,
  PLAYLISTS_UPDATE,
  PLAYLISTS_STATE_RESET,
} from '@soundnode-redux/client/src/features/playlists/playlistsActionTypes';
import { defaultWarning } from '@soundnode-redux/client/src/features/notification/notificationActions';
import { fetchMyPlaylists } from '@soundnode-redux/client/src/common/api/meApi';
import { getPlaylistById } from '@soundnode-redux/client/src/features/entities/entitiesSelectors';
import { updatePlayQueue } from '@soundnode-redux/client/src/features/playQueue/playQueueActions';
import { loadTrackAndPlay } from '@soundnode-redux/client/src/features/player/playerActions';

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
    .then(normalizePlaylists)
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
      console.error(err);
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

// export function deletePlaylist(playlistId) {
//   return (dispatch) => {
//     dispatch(showLoadingOverlay());
//     deleteSinglePlaylist(playlistId)
//       .then(() => {
//         console.log('success');
//         // Reload playlists page
//         // Sound cloud will not perform instand deletion.
//         dispatch({
//           type: PLAYLISTS_PLAYLIST_DELETE,
//           payload: {
//             playlistId,
//           },
//         });
//         // dispatch(loadPlaylists());
//         dispatch(hideLoadingOverlay());
//         dispatch(notificationSuccess('Playlist will be deleted shortly'));
//       })
//       .catch((err) => {
//         // notification warning
//         dispatch(defaultWarning());
//         console.error(err);
//       });
//   };
// }

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

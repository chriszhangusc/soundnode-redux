import {
  PLAYLIST_FILTER_TEXT_UPDATE,
  PLAYLIST_REQUEST_QUEUE_ADD,
  PLAYLIST_REQUEST_QUEUE_REMOVE,
} from '@soundnode-redux/client/src/features/modals/addToPlaylist/addToPlaylistActionTypes';
import {
  addTrackToPlaylist,
  removeTrackFromPlaylist,
} from '@soundnode-redux/client/src/common/api/playlistApi';
import {
  defaultWarning,
  notificationSuccess,
} from '@soundnode-redux/client/src/features/notification/notificationActions';
import {
  PLAYLIST_TRACK_ADD,
  PLAYLIST_TRACK_REMOVE,
} from '@soundnode-redux/client/src/features/entities/playlists/playlistsActionTypes';
import { showModal } from '@soundnode-redux/client/src/features/modals/root/rootModalActions';

export function showAddToPlaylistModal(trackId) {
  return (dispatch) => {
    dispatch(showModal('ADD_TO_PLAYLIST', {
      trackId,
    }));
  };
}

export function startRequest(playlistId) {
  return {
    type: PLAYLIST_REQUEST_QUEUE_ADD,
    payload: {
      playlistId,
    },
  };
}

export function endRequest(playlistId) {
  return {
    type: PLAYLIST_REQUEST_QUEUE_REMOVE,
    payload: {
      playlistId,
    },
  };
}

export function addToPlaylist(trackId, userId, playlistId) {
  return (dispatch) => {
    dispatch(startRequest(playlistId));
    addTrackToPlaylist(trackId, userId, playlistId)
      .then(() => {
        dispatch({
          type: PLAYLIST_TRACK_ADD,
          payload: {
            playlistId,
            trackId,
          },
        });
        dispatch(notificationSuccess('Track added to playlist'));
        dispatch(endRequest(playlistId));
      })
      .catch((err) => {
        console.error(err);
        dispatch(endRequest(playlistId));
        dispatch(defaultWarning());
      });
  };
}

export function removeFromPlaylist(trackId, userId, playlistId) {
  return (dispatch) => {
    dispatch(startRequest(playlistId));
    removeTrackFromPlaylist(trackId, userId, playlistId)
      .then(() => {
        dispatch({
          type: PLAYLIST_TRACK_REMOVE,
          payload: {
            playlistId,
            trackId,
          },
        });
        dispatch(notificationSuccess('Track removed from playlist'));
        dispatch(endRequest(playlistId));
      })
      .catch((err) => {
        console.error(err);
        dispatch(endRequest(playlistId));
        dispatch(defaultWarning());
      });
  };
}

export function updateFilterText(text) {
  return {
    type: PLAYLIST_FILTER_TEXT_UPDATE,
    payload: {
      filterText: text,
    },
  };
}

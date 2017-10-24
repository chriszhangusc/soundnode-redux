import { PLAYLIST_FILTER_TEXT_UPDATE } from 'features/modals/addToPlaylist/addToPlaylistActionTypes';
import { addTrackToPlaylist, removeTrackFromPlaylist } from 'common/services/scApiService';
import { defaultWarning, notificationSuccess } from 'features/notification/notificationActions';
import {
  PLAYLIST_TRACK_ADD,
  PLAYLIST_TRACK_REMOVE,
} from 'features/entities/playlists/playlistsActionTypes';

export function addToPlaylist(trackId, userId, playlistId) {
  return (dispatch) => {
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
      })
      .catch((err) => {
        console.log(err);
        dispatch(defaultWarning());
      });
  };
}

export function removeFromPlaylist(trackId, userId, playlistId) {
  return (dispatch) => {
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
      })
      .catch((err) => {
        console.log(err);
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

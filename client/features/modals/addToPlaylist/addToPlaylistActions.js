import { PLAYLIST_FILTER_TEXT_UPDATE } from 'features/modals/addToPlaylist/addToPlaylistActionTypes';
import { PLAYLIST_TRACK_ADD } from 'features/playlists/playlistsActionTypes';
import { addTrackToPlaylist, removeTrackFromPlaylist } from 'common/services/scApiService';

// addTrackToPlaylist(track.id, currentUserId, playlist.id).then(() => {
//   const updater = [...this.state.playlists];
//   updater.forEach(pl => {
//     if (pl.id === playlist.id) {
//       pl.tracks.push(track);
//     }
//   });
//   this.setState(updater);
//   this.props.actions.notificationSuccess('Track added to playlist');
// });

export function addToPlaylist(trackId, userId, playlistId) {
  return dispatch => {
    addTrackToPlaylist(trackId, userId, playlistId).then(() => {
      // Update item in state
      dispatch({
        type: PLAYLIST_TRACK_ADD,
        payload: {
          playlistId,
          trackId,
        },
      });
      this.props.actions.notificationSuccess('Track added to playlist');
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

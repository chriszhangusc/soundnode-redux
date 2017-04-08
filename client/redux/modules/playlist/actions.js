import {
  CHANGE_VISIBLE_PLAYLIST_NAME,
  CHANGE_ACTIVE_PLAYLIST_NAME,
  TOGGLE_PLAYLIST,
  APPEND_TRACK_TO_PLAYLIST,
  CLEAR_PLAY_QUEUE,
} from './types';


/* Action Creators */
export const changeVisiblePlaylistName = playlistName => ({
  type: CHANGE_VISIBLE_PLAYLIST_NAME,
  payload: playlistName,
});

export const changeActivePlaylistName = playlistName => ({
  type: CHANGE_ACTIVE_PLAYLIST_NAME,
  payload: playlistName,
});

export const togglePlaylist = () => ({ type: TOGGLE_PLAYLIST });

export const appendTrackToPlaylist = trackId => ({
  type: APPEND_TRACK_TO_PLAYLIST,
  payload: trackId,
});


/* Thunks logic */

// #TODO: Review later
export function addToPlayQueueIfNeeded(trackId) {
  // If the track to be added is already in current play queue, do nothing
  // If not, append it to the end of the list.
  return (dispatch, getState) => {
    // const state = getState();
    // const currentPlaylist = getActivePlaylist(state);
    // if (currentPlaylist.indexOf(trackId) === -1) {
    //   dispatch(appendTrackToPlaylist(trackId));
    // }
  };
}

export function clearPlayQueue() {
  return {
    type: CLEAR_PLAY_QUEUE,
    payload: {
      notificationSuccess: 'Play Queue Cleared!',
    },
  };
}
import {
  LOAD_PLAYLIST,
  TOGGLE_PLAYLIST
} from 'client/constants/ActionTypes';

export const togglePlaylist = () => ({ type: TOGGLE_PLAYLIST });

/**
 * Load currently visible charts to our playlist
 * @return Action
 */
export const loadPlaylist = trackMap => ({
  type: LOAD_PLAYLIST,
  payload: trackMap
});

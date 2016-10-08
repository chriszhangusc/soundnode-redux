import {
  LOAD_PLAYLIST
} from 'client/constants/ActionTypes';

/**
 * Load currently visible charts to our playlist
 * @return Action
 */
export const loadPlaylist = playlist => ({
  type: LOAD_PLAYLIST,
  payload: playlist
});

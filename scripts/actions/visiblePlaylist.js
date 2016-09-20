import { CHANGE_VISIBLE_PLAYLIST } from '../constants/ActionTypes';

export const changeVisiblePlaylist = visiblePlaylist => ({
  type: CHANGE_VISIBLE_PLAYLIST,
  payload: visiblePlaylist
})

import { CHANGE_VISIBLE_PLAYLIST } from '../constants/ActionTypes';

const visiblePlaylist = (state = '', action) => {
  switch (action.type) {
    case CHANGE_VISIBLE_PLAYLIST:
      return action.visiblePlaylist;
    default:
      return state;
  }
};



export default visiblePlaylist;

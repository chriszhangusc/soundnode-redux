import { combineReducers } from 'redux';
import addToPlaylist from 'features/modals/addToPlaylist/addToPlaylistReducer';
import root from 'features/modals/root/rootModalReducer';

const modalsReducer = combineReducers({
  addToPlaylist,
  root,
});

export default modalsReducer;

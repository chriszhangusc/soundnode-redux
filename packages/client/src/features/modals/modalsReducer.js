import { combineReducers } from 'redux';
import addToPlaylist from '@soundnode-redux/client/src/features/modals/addToPlaylist/addToPlaylistReducer';
import root from '@soundnode-redux/client/src/features/modals/root/rootModalReducer';

const modalsReducer = combineReducers({
  addToPlaylist,
  root,
});

export default modalsReducer;

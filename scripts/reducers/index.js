import playlists from './playlists';
import activeSong from './activeSong';
import {combineReducers} from 'redux';
const rootReducer = combineReducers({
  playlists,
  activeSong,
});

export default rootReducer;

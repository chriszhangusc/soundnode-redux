import playlists from './playlists';
import player from './player';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  playlists,
  player,
});

export default rootReducer;

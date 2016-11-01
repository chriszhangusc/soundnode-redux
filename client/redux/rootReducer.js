import { combineReducers } from 'redux-immutable';
import chartsReducer from './modules/charts';
import playerReducer from './modules/player';
import playlistReducer from './modules/playlist';
import artistReducer from './modules/artist';
import trackReducer from './modules/track';
import uiReducer from './modules/ui';
import entitiesReducer from './modules/entities';
import searchReducer from './modules/search';
import userReducer from './modules/user';

const rootReducer = combineReducers({
  ui: uiReducer,
  entities: entitiesReducer,
  charts: chartsReducer,
  playlist: playlistReducer,
  player: playerReducer,
  artist: artistReducer,
  track: trackReducer,
  user: userReducer,
  search: searchReducer,
});

export default rootReducer;
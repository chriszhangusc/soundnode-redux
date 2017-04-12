import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import chartsReducer from './modules/charts/reducer';
import playerReducer from './modules/player/reducer';
import playlistReducer from './modules/playlist/reducer';
import userReducer from './modules/user/reducer';
// import trackReducer from './modules/track';
// import uiReducer from './modules/ui';
import entitiesReducer from './modules/entities';
import searchReducer, { dropdownSearchEpic } from './modules/search';
// import authReducer from './modules/auth';

export const rootEpic = combineEpics(
  dropdownSearchEpic,
);

export const rootReducer = combineReducers({
  // ui: uiReducer,
  entities: entitiesReducer,
  charts: chartsReducer,
  playlist: playlistReducer,
  player: playerReducer,
  // Single user profile page
  user: userReducer,
  // Single track profile page
  // track: trackReducer,
  search: searchReducer,
  // auth: authReducer,
});

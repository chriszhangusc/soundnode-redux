import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import chartsReducer from './modules/charts/chartsReducer';
import entitiesReducer from './modules/entities/reducer';
import playerReducer from './modules/player/reducer';
import playlistReducer from './modules/playlist/reducer';
import userReducer from './modules/user/reducer';
import searchReducer, { dropdownSearchEpic } from './modules/search';

export const rootEpic = combineEpics(
  dropdownSearchEpic,
);

export const rootReducer = combineReducers({
  entities: entitiesReducer,
  charts: chartsReducer,
  playlist: playlistReducer,
  player: playerReducer,
  // Single user profile page
  user: userReducer,
  // Single track profile page
  // track: trackReducer,
  search: searchReducer,
});

import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import chartsReducer from 'client/features/charts/chartsReducer';
import entitiesReducer from 'client/features/entities/entitiesReducer';
import playerReducer from 'client/features/player/playerReducer';
import playlistReducer from 'client/features/playlist/playlistReducer';
import userReducer from 'client/features/userProfile/userProfileReducer';
import searchReducer, { dropdownSearchEpic } from 'client/features/search';

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

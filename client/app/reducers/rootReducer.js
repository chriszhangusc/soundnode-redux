import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import chartsReducer from 'client/features/charts/chartsReducer';
import entitiesReducer from 'client/features/entities/entitiesReducer';
import playerReducer from 'client/features/player/playerReducer';
import playlistReducer from 'client/features/playlist/playlistReducer';
import userProfileReducer from 'client/features/userProfile/userProfileReducer';
import dropdownSearchReducer from 'client/features/dropdownSearch/dropdownSearchReducer';
import { dropdownSearchEpic } from 'client/features/dropdownSearch/dropdownSearchActions';

export const rootEpic = combineEpics(
  dropdownSearchEpic,
);

export const rootReducer = combineReducers({
  entities: entitiesReducer,
  charts: chartsReducer,
  playlist: playlistReducer,
  player: playerReducer,
  // Single user profile page
  user: userProfileReducer,
  // Single track profile page
  // track: trackReducer,
  dropdownSearch: dropdownSearchReducer,
});

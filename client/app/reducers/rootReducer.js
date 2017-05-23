import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import chartsReducer from 'client/features/charts/chartsReducer';
import entitiesReducer from 'client/features/entities/entitiesReducer';
import playerReducer from 'client/features/player/playerReducer';
import playlistReducer from 'client/features/playlist/playlistReducer';
import userProfileReducer from 'client/features/userProfile/userProfileReducer';
import trackProfileReducer from 'client/features/trackProfile/trackProfileReducer';
import dropdownSearchReducer from 'client/features/dropdownSearch/dropdownSearchReducer';
import authReducer from 'client/features/auth/authReducer';

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
  userProfile: userProfileReducer,
  trackProfile: trackProfileReducer,
  // Single track profile page
  dropdownSearch: dropdownSearchReducer,
  auth: authReducer,
});

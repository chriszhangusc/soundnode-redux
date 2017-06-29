import { combineReducers } from 'redux';
import chartsReducer from 'features/charts/chartsReducer';
import entitiesReducer from 'features/entities/entitiesReducer';
import playerReducer from 'features/player/playerReducer';
import playlistReducer from 'features/playlist/playlistReducer';
import userProfileReducer from 'features/userProfile/userProfileReducer';
import trackProfileReducer from 'features/trackProfile/trackProfileReducer';
import dropdownSearchReducer from 'features/dropdownSearch/dropdownSearchReducer';
import authReducer from 'features/auth/authReducer';
import notificationReducer from 'features/notification/notificationReducer';
import favoritesReducer from 'features/favorites/favoritesReducer';
import streamReducer from 'features/stream/streamReducer';
import searchReducer from 'features/search/searchReducer';
import userPlaylistsReducer from 'features/userPlaylists/userPlaylistsReducer';

const rootReducer = combineReducers({
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
  notification: notificationReducer,
  favorites: favoritesReducer,
  stream: streamReducer,
  search: searchReducer,
  userPlaylists: userPlaylistsReducer,
});

export default rootReducer;

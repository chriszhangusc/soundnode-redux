import { combineReducers } from 'redux';
import chartsReducer from 'features/charts/chartsReducer';
import entitiesReducer from 'features/entities/entitiesReducer';
import playerReducer from 'features/player/playerReducer';
import playQueueReducer from 'features/playQueue/playQueueReducer';
import userProfileReducer from 'features/userProfile/userProfileReducer';
import trackProfileReducer from 'features/trackProfile/trackProfileReducer';
import searchSuggestionReducer from 'features/searchSuggestion/searchSuggestionReducer';
import authReducer from 'features/auth/authReducer';
import notificationReducer from 'features/notification/notificationReducer';
import favoritesReducer from 'features/favorites/favoritesReducer';
import streamReducer from 'features/stream/streamReducer';
import searchReducer from 'features/search/searchReducer';
import playlistsReducer from 'features/playlists/playlistsReducer';
import sidebarReducer from 'features/sidebar/sidebarReducer';
import loadingOverlayReducer from 'features/loadingOverlay/loadingOverlayReducer';
import errorsReducer from 'features/errors/errorsReducer';
import modalsReducer from 'features/modals/modalsReducer';
import overlayReducer from 'features/overlay/overlayReducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  charts: chartsReducer,
  playQueue: playQueueReducer,
  player: playerReducer,
  // Single user profile page
  userProfile: userProfileReducer,
  trackProfile: trackProfileReducer,
  // Single track profile page
  searchSuggestion: searchSuggestionReducer,
  auth: authReducer,
  notification: notificationReducer,
  favorites: favoritesReducer,
  stream: streamReducer,
  search: searchReducer,
  playlists: playlistsReducer,
  sidebar: sidebarReducer,
  loadingOverlay: loadingOverlayReducer,
  errors: errorsReducer,
  modals: modalsReducer,
  overlay: overlayReducer,
});

export default rootReducer;

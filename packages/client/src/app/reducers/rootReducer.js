import { combineReducers } from 'redux';
import chartsReducer from '@soundnode-redux/client/src/features/charts/chartsReducer';
import entitiesReducer from '@soundnode-redux/client/src/features/entities/entitiesReducer';
import playerReducer from '@soundnode-redux/client/src/features/player/playerReducer';
import playQueueReducer from '@soundnode-redux/client/src/features/playQueue/playQueueReducer';
import userProfileReducer from '@soundnode-redux/client/src/features/userProfile/userProfileReducer';
import searchSuggestionReducer from '@soundnode-redux/client/src/features/searchSuggestion/searchSuggestionReducer';
import authReducer from '@soundnode-redux/client/src/features/auth/authReducer';
import notificationReducer from '@soundnode-redux/client/src/features/notification/notificationReducer';
import favoritesReducer from '@soundnode-redux/client/src/features/favorites/favoritesReducer';
import streamReducer from '@soundnode-redux/client/src/features/stream/streamReducer';
import searchReducer from '@soundnode-redux/client/src/features/search/searchReducer';
import playlistsReducer from '@soundnode-redux/client/src/features/playlists/playlistsReducer';
import sidebarReducer from '@soundnode-redux/client/src/features/sidebar/sidebarReducer';
import loadingOverlayReducer from '@soundnode-redux/client/src/features/loadingOverlay/loadingOverlayReducer';
import modalsReducer from '@soundnode-redux/client/src/features/modals/modalsReducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  charts: chartsReducer,
  playQueue: playQueueReducer,
  player: playerReducer,
  // Single user profile page
  userProfile: userProfileReducer,
  searchSuggestion: searchSuggestionReducer,
  auth: authReducer,
  notification: notificationReducer,
  favorites: favoritesReducer,
  stream: streamReducer,
  search: searchReducer,
  playlists: playlistsReducer,
  sidebar: sidebarReducer,
  loadingOverlay: loadingOverlayReducer,
  modals: modalsReducer,
});

export default rootReducer;

/* Main reducer */
import { combineReducers } from 'redux-immutable';
import { List } from 'immutable';

import * as fromPlayer from './player';
import * as fromSearch from './search';
import * as fromUser from './user';
import * as fromArtist from './artist';
import * as fromCharts from './charts';
import * as fromPlaylist from './playlist';
import * as fromTrack from './track';
import * as fromEntities from './entities';
import * as fromUI from './ui';

const rootReducer = combineReducers({
  ui: fromUI.default,
  entities: fromEntities.default,
  charts: fromCharts.default,
  playlist: fromPlaylist.default,
  player: fromPlayer.default,
  user: fromUser.default,
  search: fromSearch.default,
  artist: fromArtist.default,
  track: fromTrack.default
});

/* From ui */
export const getVisibleTrackIds = state => fromUI.getVisibleTrackIds(state.get('ui'));
/* From entities */


// Get Array of Immutable Records
// export const getTracksAsArray = (state, trackIds) =>
//   trackIds.map(trackId => fromEntities.getTrackById(state.get('entities', trackId)));

/* From Playlist */
export const isPlaylistHidden = state => fromPlaylist.isPlaylistHidden(state.get('playlist'));
export const getPlaylistTrackIds = state => fromPlaylist.getTrackIds(state.get('playlist'));
export const isPlaylistEmpty = state => fromPlaylist.isEmpty(state.get('playlist'));
export const isTrackInPlaylist = (state, trackId) => getPlaylistTrackIds(state).indexOf(trackId);


/* From Search */
export const isSearching = state => fromSearch.isFetching(state.get('search'));
export const isSearchResultShown = state => fromSearch.isShown(state.get('search'));

export const getDropdownSearchTrackIds = state =>
  fromSearch.getDropdownSearchTrackIds(state.get('search'));

export const getDropdownSearchArtistIds = state =>
  fromSearch.getDropdownSearchArtistIds(state.get('search'));

// Get the general search result ids.
export const getSearchResultTrackIds = state => fromSearch.getSearchTrackIds(state.get('search'));

/* From user */
export const getUserLikes = state => fromUser.getLikes(state.get('user'));
export const isTrackLiked = (state, trackId) => {
  const likes = getUserLikes(state);
  return likes.has(trackId);
};

export const getUserId = state => fromUser.getUid(state.get('user'));
export const getDisplayName = state => fromUser.getDisplayName(state.get('user'));
export const getPhotoUrl = state => fromUser.getPhotoUrl(state.get('user'));
// Return all trackIds liked by current logged in user.
export const getUserLikeIds = state => List(getUserLikes(state).keySeq());

export default rootReducer;

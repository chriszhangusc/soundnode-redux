/* Main reducer */
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';
import * as fromPlaylists from './playlists/reducers/playlists';
import * as fromPlayer from './player/reducers/player';
import * as fromUser from './user/reducers/user';
import * as fromSearch from './search/reducers/search';
import * as fromArtist from './artist/reducers/artist';
import { formatImageUrl, formatTitle, formatStreamUrl } from '../utils/FormatUtils';


const rootReducer = combineReducers({
  playlists: fromPlaylists.default,
  player: fromPlayer.default,
  user: fromUser.default,
  search: fromSearch.default,
  artist: fromArtist.default
});

/* From artist */
export const getArtistFetchState = state => fromArtist.getIsFetching(state.get('artist'));
export const getArtistAvatarUrl = state => fromArtist.getAvatarUrl(state.get('artist'));
export const getArtistName = state => fromArtist.getName(state.get('artist'));
export const getArtistFollowers = state => fromArtist.getFollowers(state.get('artist'));
export const getArtistDescription = state => fromArtist.getDescription(state.get('artist'));

// Selectors are our reading API of our state,
// so it is recommended to colocate them with the reducers.
/* From search */
export const getSearchTracksAsArray = state => fromSearch.getTracksAsArray(state.get('search'));
export const getSearchTrackNextHref = state => fromSearch.getTrackNextHref(state.get('search'));
export const getSearchUsersAsArray = state => fromSearch.getUsersAsArray(state.get('search'));
export const getSearchUsersNextHref = state => fromSearch.getUserNextHref(state.get('search'));
export const getSearchIsFetching = state => fromSearch.getIsFetching(state.get('search'));
export const getShowResults = state => fromSearch.getShowResults(state.get('search'));

/* From user */
export const isSongLiked = (state, songId) => {
  const likes = fromUser.getLikes(state.get('user'));
  return (songId in likes);
};

export const getLikes = state => fromUser.getLikes(state.get('user'));

export const getUid = state => fromUser.getUid(state.get('user'));

export const getDisplayName = state => fromUser.getDisplayName(state.get('user'));

export const getPhotoUrl = state => fromUser.getPhotoUrl(state.get('user'));

/* From Playlists */

// Return the current player playlist name
export const getPlayerPlaylistName = state =>
  fromPlaylists.getPlayerPlaylistName(state.get('playlists'));

// Return the current playlist object itself
export const getPlayerPlaylist = state => fromPlaylists.getPlayerPlaylist(state.get('playlists'));

// Return the visible playlist name
export const getVisiblePlaylistName = state =>
  fromPlaylists.getVisiblePlaylistName(state.get('playlists'));

// Return the visible playlist object itself
export const getVisiblePlaylist = state => fromPlaylists.getVisiblePlaylist(state.get('playlists'));

// Return the fetch state of the current visible playlist
export const getVisibleFetchState = state =>
  fromPlaylists.getVisibleFetchState(state.get('playlists'));

// Get the Songs Object-Array of current player playlist
export const getPlayerSongMap = state => fromPlaylists.getPlayerSongMap(state.get('playlists'));

export const getPlayerSongIds = state => fromPlaylists.getPlayerSongIds(state.get('playlists'));

export const getVisibleSongMap = state => fromPlaylists.getVisibleSongMap(state.get('playlists'));

export const getVisibleSongIds = state => fromPlaylists.getVisibleSongIds(state.get('playlists'));

export const getVisibleNextUrl = state => fromPlaylists.getVisibleNextUrl(state.get('playlists'));

// Return if the playlistName is already loaded
export const playlistExists = (state, playlistName) =>
  fromPlaylists.playlistExists(state.get('playlists'), playlistName);

/* From player */
export const getShowPlaylist = state => fromPlayer.getShowPlaylist(state.get('player'));

export const getShuffleDraw = state => fromPlayer.getShuffleDraw(state.get('player'));

export const getShuffleDiscard = state => fromPlayer.getShuffleDiscard(state.get('player'));

export const shuffleInitialized = state => fromPlayer.shuffleInitialized(state.get('player'));

export const getCurrentSongId = state => fromPlayer.getCurrentSongId(state.get('player'));

export const getCurrentSong = state => fromPlayer.getCurrentSong(state.get('player'));

export const getPlayingState = state => fromPlayer.getPlayingState(state.get('player'));

export const getCurrentVolume = state => fromPlayer.getCurrentVolume(state.get('player'));

export const getVolumeSeekState = state => fromPlayer.getVolumeSeekState(state.get('player'));

export const getCurrentTime = state => fromPlayer.getCurrentTime(state.get('player'));

export const getSeekState = state => fromPlayer.getSeekState(state.get('player'));

export const getPlayerMode = state => fromPlayer.getPlayerMode(state.get('player'));

/* Composed memoized selectors */
/* Players */
export const getDuration = createSelector(
  [getCurrentSong],
  currentSong => (currentSong ? currentSong.duration / 1000.0 : null)
);

export const getStreamUrl = createSelector(
  [getCurrentSong],
  currentSong => (currentSong ? formatStreamUrl(currentSong.uri) : null)
);

export const getCurrentSongTitle = createSelector(
  [getCurrentSong],
  currentSong => (currentSong ? currentSong.title : null)
);

export const getCurrentSongUsername = createSelector(
  [getCurrentSong],
  currentSong => (currentSong ? currentSong.user.username : null)
);

export const getCurrentSongArtworkUrl = createSelector(
  [getCurrentSong],
  currentSong => (currentSong ? currentSong.artwork_url : null)
);

/* songCardListSelectors */
// Return the sorted array of songs of visible playlist
export const getVisibleSongsAsArray = createSelector(
  [getVisibleSongMap, getVisibleSongIds],
  (songsById, songIds) => (songIds && songsById ? songIds.map(id => songsById[id]) : [])
);

export const getPlayerPlaylistAsArray = createSelector(
  [getPlayerSongMap, getPlayerSongIds],
  (songsById, songIds) => (songIds && songsById ? songIds.map(id => songsById[id]) : [])
);

/* SongCardSelectors */

export function getSongImage(song) {
  return formatImageUrl(song.artwork_url);
}

export const getSongTitle = song => formatTitle(song.title);

export const getSongUserAvatar = song => (song.user ? song.user.avatar_url : undefined);

export const getSongUsername = song => (song.user ? song.user.username : undefined);

// Return if the specific song is playing or not
export const getSingleSongPlayingState = (state, id) => {
  const currentSongId = getCurrentSongId(state);
  return currentSongId === id ? getPlayingState(state) : false;
};

// To memoize it we have to check out createSelector with param!
export const getSingleSongIsActive = (state, id) => {
  if (!id) return false;
  const currentSongId = getCurrentSongId(state);
  return currentSongId ? id === currentSongId : false;
};

// Return the song object by songId from current player playlist
export const getSongByIdFromPlaylist = (state, id) => {
  const playerSongMap = getPlayerSongMap(state);
  return playerSongMap ? playerSongMap[id] : undefined;
};

export default rootReducer;

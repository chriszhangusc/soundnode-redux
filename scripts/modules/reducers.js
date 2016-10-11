/* Main reducer */
import { combineReducers } from 'redux-immutable';
import { formatImageUrl, formatTitle, formatStreamUrl } from 'client/utils/FormatUtils';
import * as fromPlayer from './player/reducers/player';
import * as fromUser from './user/reducers/user';
import * as fromSearch from './search/reducers/search';
import * as fromArtist from './artist/reducers/artist';
import * as fromCharts from './charts/reducers/charts';
import * as fromPlaylist from './playlist/reducers/playlist';
import * as fromTrack from './track/reducers/track';

const rootReducer = combineReducers({
  // playlists: fromPlaylists.default,
  charts: fromCharts.default,
  playlist: fromPlaylist.default,
  player: fromPlayer.default,
  user: fromUser.default,
  search: fromSearch.default,
  artist: fromArtist.default,
  track: fromTrack.default
});

/* From Charts */
export const getChartsGenre = state => fromCharts.getGenre(state.get('charts'));
export const getChartsTrackMap = state => fromCharts.getTrackMap(state.get('charts'));
export const getIsChartsFetching = state => fromCharts.getIsFetching(state.get('charts'));


/* From Track */
export const getIsTrackFetching = state => fromTrack.getIsFetching(state.get('track'));
export const getTrackRecord = state => fromTrack.getTrack(state.get('track'));
export const getTrackArtistRecord = state => fromTrack.getArtist(state.get('track'));

/* From Playlist */
export const getPlaylistAsOrderedMap = state =>
  fromPlaylist.getPlaylistAsOrderedMap(state.get('playlist'));
export const getPlaylistAsArray = state => fromPlaylist.getPlaylistAsArray(state.get('playlist'));
/* From Artist */
export const getArtistRecord = state => fromArtist.getArtistRecord(state.get('artist'));
export const getArtistFetchState = state => fromArtist.getIsFetching(state.get('artist'));
export const getArtistTracksAsArray = state => fromArtist.getTracksAsArray(state.get('artist'));
export const getArtistTracksFetchState = state =>
  fromArtist.getTracksFetchState(state.get('artist'));

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


/* From player */
export const getCurrentPlayerTrack = state => fromPlayer.getCurrentTrack(state.get('player'));

export const getShowPlaylist = state => fromPlayer.getShowPlaylist(state.get('player'));

export const getShuffleDraw = state => fromPlayer.getShuffleDraw(state.get('player'));

export const getShuffleDiscard = state => fromPlayer.getShuffleDiscard(state.get('player'));

export const shuffleInitialized = state => fromPlayer.shuffleInitialized(state.get('player'));

export const getPlayingState = state => fromPlayer.getPlayingState(state.get('player'));

export const getCurrentVolume = state => fromPlayer.getCurrentVolume(state.get('player'));

export const getVolumeSeekState = state => fromPlayer.getVolumeSeekState(state.get('player'));

export const getCurrentTime = state => fromPlayer.getCurrentTime(state.get('player'));

export const getSeekState = state => fromPlayer.getSeekState(state.get('player'));

export const getPlayerMode = state => fromPlayer.getPlayerMode(state.get('player'));

/* Composed memoized selectors */

// Return if the specific song is playing or not
export const getSingleSongPlayingState = (state, id) => {
  const currentSongId = getCurrentPlayerTrack(state).getId();
  return currentSongId === id ? getPlayingState(state) : false;
};

// To memoize it we have to check out createSelector with param!
export const getSingleSongIsActive = (state, id) => {
  if (!id) return false;
  const currentSongId = getCurrentPlayerTrack(state).getId();
  return currentSongId ? id === currentSongId : false;
};

// // Return the song object by songId from current player playlist
// export const getSongByIdFromPlaylist = (state, id) => {
//   const playerSongMap = getPlayerSongMap(state);
//   return playerSongMap ? playerSongMap[id] : undefined;
// };

export default rootReducer;

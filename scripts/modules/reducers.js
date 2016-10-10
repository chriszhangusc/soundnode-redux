/* Main reducer */
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';
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

/* From Track */
export const getIsTrackFetching = state => fromTrack.getIsFetching(state.get('track'));
export const getTrackRecord = state => fromTrack.getTrack(state.get('track'));
export const getTrackArtistRecord = state => fromTrack.getArtist(state.get('track'));
// export const getTrackTitle = state => fromTrack.getTitle(state.get('track'));
// export const getTrackDescription = state => fromTrack.getDescription(state.get('track'));
// export const getTrackArtworkUrl = state => fromTrack.getArtworkUrl(state.get('track'));
// export const getTrackCreatedAt = state => fromTrack.getCreatedAt(state.get('track'));
// export const getTrackArtistName = state => fromTrack.getArtistName(state.get('track'));
// export const getTrackCommentCount = state => fromTrack.getCommentCount(state.get('track'));
// export const getTrackPlaybackCount = state => fromTrack.getPlaybackCount(state.get('track'));
// export const getTrackLikedCount = state => fromTrack.getLikedCount(state.get('track'));

/* From Playlist */
export const getPlaylistMap = state => fromPlaylist.getPlaylistMap(state.get('playlist'));
export const getPlaylistIds = state => fromPlaylist.getPlaylistIds(state.get('playlist'));
export const getPlaylistAsArray = state => fromPlaylist.getPlaylistAsArray(state.get('playlist'));

/* From Charts */
export const getChartsGenre = state => fromCharts.getGenre(state.get('charts'));
export const getChartsMap = state => fromCharts.getTracksMap(state.get('charts'));
export const getChartsIds = state => fromCharts.getTrackIds(state.get('charts'));
// const getTracksMap = state => state.get('tracksById').toJS();
// const getTrackIds = state => state.get('trackIds').toJS();
export const getChartsAsArray = state => fromCharts.getTracksAsArray(state.get('charts'));
export const getIsChartsFetching = state => fromCharts.getIsFetching(state.get('charts'));


/* From artist */
export const getArtistFetchState = state => fromArtist.getIsFetching(state.get('artist'));
export const getArtistAvatarUrl = state => fromArtist.getAvatarUrl(state.get('artist'));
export const getArtistName = state => fromArtist.getName(state.get('artist'));
export const getArtistFollowers = state => fromArtist.getFollowers(state.get('artist'));
export const getArtistDescription = state => fromArtist.getDescription(state.get('artist'));
export const getArtistTracksAsArray = state => fromArtist.getTracksAsArray(state.get('artist'));
export const getArtistTracksFetchState = state =>
  fromArtist.getTracksFetchState(state.get('artist'));
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

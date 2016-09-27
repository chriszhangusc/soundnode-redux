import * as selectors from '../reducers';
import { formatImageUrl, formatTitle } from '../utils/FormatUtils';

export function getSongImage(song) {
  return formatImageUrl(song.artwork_url);
}

export const getSongTitle = song => formatTitle(song.title);

export const getSongUserAvatar = song => (song.user ? song.user.avatar_url : undefined);

export const getSongUsername = song => (song.user ? song.user.username : undefined);

// Return if the specific song is playing or not
export const getSingleSongPlayingState = (state, id) => {
  const currentSongId = selectors.getCurrentSongId(state);
  return currentSongId === id ? selectors.getPlayingState(state) : false;
};

// To memoize it we have to check out createSelector with param!
export const getSingleSongIsActive = (state, id) => {
  const currentSongId = selectors.getCurrentSongId(state);
  return currentSongId ? id === currentSongId : false;
};

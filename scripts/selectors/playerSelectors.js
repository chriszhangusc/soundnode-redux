import {createSelector} from 'reselect';
import {generateStreamUrl} from '../utils/SongUtils';
import {currentPlaylistSongsSelector} from './songCardsSelectors';
import _ from 'lodash';
// Example code
// import _ from 'lodash';
// const postSelector = state => state.posts;
// const selectedPostsSelector = state => state.selectedPostIds;
//
// const getPosts = (posts, selectedPostIds) {
//   const selectedPosts = _.filter(
//     posts,
//     post => _.contains(selectedPostIds, post.id);
//   );
//   return selectedPosts;
// };
//
// export default createSelector(
//   postSelector,
//   selectedPostsSelector,
//   getPosts
// );

const getCurrentSongId = state => state.player.currentSongId

// Return the current active song object
export const getCurrentSong = createSelector(
  getCurrentSongId,
  getCurrentSongsInPlaylist,
  (id, songs) => {
    const res = _.find(songs, {'id': id});
    return res;
  }
);

// This is a 'Memoized' selector, which only recompute when the relevant state value change!
export const srcSelector = createSelector(
  currentSongSelector,
  currentSong => generateStreamUrl(currentSong)
);

export const durationSelector = c

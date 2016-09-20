import * as playerActions from './player';
import * as playlistsActions from './playlists';
import * as visiblePlaylistActions from './visiblePlaylist';
export default {
  ...playerActions,
  ...playlistsActions,
  ...visiblePlaylistActions
};

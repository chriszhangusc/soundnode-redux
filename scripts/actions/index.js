import * as playerActions from './player';
import * as playlistsActions from './playlists';
import * as userActions from './auth';

export default {
  ...playerActions,
  ...playlistsActions,
  ...userActions
};

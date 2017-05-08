import { connect } from 'react-redux';
// import { getPlayerMode, isPlaylistHidden } from 'client/features/reducers';
import { REPEAT, SHUFFLE } from 'client/features/player/consts';
import { getPlayerMode } from 'client/features/player/playerSelectors';
import { togglePlayMode } from 'client/features/player/playerActions';

import { isPlaylistHidden } from 'client/features/playlist/playlistSelectors';
import { togglePlaylist } from 'client/features/playlist/playlistActions';

import PlayerModeControls from '../components/PlayerModeControls';

const mapStateToProps = state => ({
  mode: getPlayerMode(state),
  playlistHidden: isPlaylistHidden(state),
});

const mapDispatchToProps = dispatch => ({
  onRepeatClick: () => { dispatch(togglePlayMode(REPEAT)); },
  onShuffleClick: () => { dispatch(togglePlayMode(SHUFFLE)); },
  onTogglePlaylistClick: () => { dispatch(togglePlaylist()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);

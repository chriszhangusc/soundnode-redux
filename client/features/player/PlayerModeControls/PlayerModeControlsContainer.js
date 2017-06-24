import { connect } from 'react-redux';
// import { getPlayerMode, isPlaylistHidden } from 'features/reducers';
import { REPEAT, SHUFFLE } from 'features/player/playerConsts';
import { getPlayerMode } from 'features/player/playerSelectors';
import { togglePlayMode } from 'features/player/playerActions';

import { isPlaylistHidden } from 'features/playlist/playlistSelectors';
import { togglePlaylist } from 'features/playlist/playlistActions';

import PlayerModeControls from './PlayerModeControls';

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

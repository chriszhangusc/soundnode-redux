import { connect } from 'react-redux';
import { getPlayerMode, isPlaylistHidden } from 'client/redux/modules/reducers';
import { sagaChangePlayMode } from 'client/redux/modules/player';
import { togglePlaylist } from 'client/redux/modules/playlist';
import { REPEAT, SHUFFLE } from 'client/constants/PlayerConstants';
import PlayerModeControls from '../components/PlayerModeControls';

const mapStateToProps = state => ({
  mode: getPlayerMode(state),
  playlistHidden: isPlaylistHidden(state)
});

const mapDispatchToProps = dispatch => ({
  onRepeatClick: () => { dispatch(sagaChangePlayMode(REPEAT)); },
  onShuffleClick: () => { dispatch(sagaChangePlayMode(SHUFFLE)); },
  onTogglePlaylistClick: () => { dispatch(togglePlaylist()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);

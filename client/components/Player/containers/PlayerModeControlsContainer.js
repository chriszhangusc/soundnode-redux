import { connect } from 'react-redux';
// import { getPlayerMode, isPlaylistHidden } from 'client/redux/modules/reducers';
import { getPlayerMode, togglePlayMode, REPEAT, SHUFFLE } from 'client/redux/modules/player';
import { togglePlaylist, isPlaylistHidden } from 'client/redux/modules/playlist';
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

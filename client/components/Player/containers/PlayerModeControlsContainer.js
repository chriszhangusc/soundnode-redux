import { connect } from 'react-redux';
// import { getPlayerMode, isPlaylistHidden } from 'client/redux/modules/reducers';
import { getPlayerMode, sagaChangePlayMode, REPEAT, SHUFFLE } from 'client/redux/modules/player';
import { togglePlaylist } from 'client/redux/modules/playlist';
import PlayerModeControls from '../components/PlayerModeControls';

const mapStateToProps = state => ({
  mode: getPlayerMode(state),
  // playlistHidden: isPlaylistHidden(state)
  playlistHidden: true,
});

const mapDispatchToProps = dispatch => ({
  onRepeatClick: () => { dispatch(sagaChangePlayMode(REPEAT)); },
  onShuffleClick: () => { dispatch(sagaChangePlayMode(SHUFFLE)); },
  onTogglePlaylistClick: () => { dispatch(togglePlaylist()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);

import { connect } from 'react-redux';
import { getCurrentPlayerTrack } from 'client/features/player/playerSelectors';
import PlayerLayout from '../components/PlayerLayout';

const mapStateToProps = state => ({
  playerTrack: getCurrentPlayerTrack(state),
});

export default connect(mapStateToProps)(PlayerLayout);

import { connect } from 'react-redux';
import PlayerSongInfo from '../../components/Player/PlayerSongInfo';
import * as selectors from '../../selectors/playerSelectors';

const mapStateToProps = state => ({
  username: selectors.getCurrentSongUsername(state),
  title: selectors.getCurrentSongTitle(state),
  artworkUrl: selectors.getCurrentSongArtworkUrl(state)
});

export default connect(mapStateToProps)(PlayerSongInfo);

import { connect } from 'react-redux';
import * as selectors from 'client/modules/reducers';
import PlayerSongInfo from '../components/PlayerSongInfo';

const mapStateToProps = state => ({
  username: selectors.getCurrentSongUsername(state),
  title: selectors.getCurrentSongTitle(state),
  artworkUrl: selectors.getCurrentSongArtworkUrl(state)
});

export default connect(mapStateToProps)(PlayerSongInfo);

import { connect } from 'react-redux';
import PlayerSongInfo from '../../components/player/PlayerSongInfo';
import * as selectors from '../../selectors/playerSelectors';

const mapStateToProps = (state) => {
  return {
    username: selectors.getCurrentSongUsername(state),
    title: selectors.getCurrentSongTitle(state),
    artworkUrl: selectors.getCurrentSongArtworkUrl(state)
  };
};

export default connect(mapStateToProps)(PlayerSongInfo);

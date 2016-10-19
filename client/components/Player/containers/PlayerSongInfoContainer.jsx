import { connect } from 'react-redux';
import PlayerSongInfo from '../components/PlayerSongInfo';

const mapStateToProps = (state, ownProps) => {
  const { track } = ownProps;
  const artist = track.getArtist();
  return {
    track,
    artist
  };
};

export default connect(mapStateToProps)(PlayerSongInfo);

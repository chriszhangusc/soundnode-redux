import { connect } from 'react-redux';
import PlayerSongInfo from '../components/PlayerSongInfo';

const mapStateToProps = (state, ownProps) => {
  const { track } = ownProps;
  const artist = track.getArtist();
  return {
    title: track.getTitle(),
    username: artist.getUsername(),
    artworkUrl: track.getArtworkUrl()
  };
};

export default connect(mapStateToProps)(PlayerSongInfo);

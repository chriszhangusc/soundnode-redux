import { connect } from 'react-redux';
import { formatTitle } from 'client/utils/FormatUtils';
import PlayerSongInfo from '../components/PlayerSongInfo';

const mapStateToProps = (state, ownProps) => {
  const { track } = ownProps;
  const artist = track.getArtist();
  return {
    trackId: track.getId(),
    artistId: artist.getId(),
    title: formatTitle(track.getTitle()),
    username: artist.getUsername(),
    artworkUrl: track.getArtworkUrl()
  };
};

export default connect(mapStateToProps)(PlayerSongInfo);

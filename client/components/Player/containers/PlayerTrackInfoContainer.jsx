import { connect } from 'react-redux';
import { getArtistByTrackId } from 'client/redux/modules/reducers';
import { formatTitle } from 'client/utils/FormatUtils';
import PlayerTrackInfo from '../components/PlayerTrackInfo';

const mapStateToProps = (state, { playerTrack }) => {
  const trackId = playerTrack.getId();
  const artist = getArtistByTrackId(state, trackId);
  const artistId = artist.getId();
  return ({
    artworkUrl: playerTrack.getArtworkUrl(),
    trackTitle: playerTrack.getTitle(),
    artistName: formatTitle(artist.getUsername()),
    trackUrl: `/track/${trackId}`,
    artistUrl: `/artist/${artistId}`
  });
};

export default connect(mapStateToProps)(PlayerTrackInfo);

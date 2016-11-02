import { connect } from 'react-redux';
import { getArtistByTrackId } from 'client/redux/modules/entities';
import { formatTitle } from 'client/utils/FormatUtils';
import PlayerTrackInfo from '../components/PlayerTrackInfo';

const mapStateToProps = (state, { playerTrack }) => {
  const trackId = playerTrack.get('id');
  const artist = getArtistByTrackId(state, trackId);
  const artistId = artist.get('id');
  return ({
    artworkUrl: playerTrack.get('artworkUrl'),
    trackTitle: playerTrack.get('title'),
    artistName: formatTitle(artist.get('username')),
    trackUrl: `/track/${trackId}`,
    artistUrl: `/artist/${artistId}`,
  });
};

export default connect(mapStateToProps)(PlayerTrackInfo);

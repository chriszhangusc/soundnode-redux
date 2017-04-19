import { connect } from 'react-redux';
import { getUserByTrackId } from 'client/redux/modules/entities';
import { formatTitle } from 'client/utils/FormatUtils';
import PlayerTrackInfo from '../components/PlayerTrackInfo';

const mapStateToProps = (state, { playerTrack }) => {
  const trackId = playerTrack.id;
  const artist = getUserByTrackId(state, trackId);
  const artistId = artist.id;
  return ({
    artworkUrl: playerTrack.artworkUrl,
    trackTitle: playerTrack.title,
    artistName: formatTitle(artist.username),
    trackUrl: `/track/${trackId}`,
    artistUrl: `/artist/${artistId}`,
  });
};

export default connect(mapStateToProps)(PlayerTrackInfo);

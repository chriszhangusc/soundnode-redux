import { connect } from 'react-redux';
import { getUserByTrackId } from 'client/features/entities/entitiesSelectors';
import { formatTitle } from 'client/common/utils/FormatUtils';
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

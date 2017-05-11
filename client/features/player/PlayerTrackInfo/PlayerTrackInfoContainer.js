import { connect } from 'react-redux';
import { getUserByTrackId } from 'client/features/entities/entitiesSelectors';
import { formatTitle } from 'client/common/utils/FormatUtils';
import PlayerTrackInfo from './PlayerTrackInfo';

const mapStateToProps = (state, { playerTrack }) => {
  const trackId = playerTrack.id;
  const artist = getUserByTrackId(state, trackId);
  const userId = artist.id;
  return ({
    artworkUrl: playerTrack.artworkUrl,
    trackTitle: playerTrack.title,
    artistName: formatTitle(artist.username),
    trackUrl: `/track/${trackId}`,
    artistUrl: `/artist/${userId}`,
  });
};

export default connect(mapStateToProps)(PlayerTrackInfo);

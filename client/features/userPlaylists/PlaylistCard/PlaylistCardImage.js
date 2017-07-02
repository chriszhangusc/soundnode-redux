import { connect } from 'react-redux';
import { getTracksByPlaylistId } from 'features/entities/entitiesSelectors';
import CardImage from 'common/components/Card/CardImage';
import { getLargeVersion } from 'common/utils/imageUtils';

// { active, playing, imageUrl, handleImageClick }
function mapStateToProps(state, { playlistId }) {
  const tracks = getTracksByPlaylistId(state, playlistId);
  return {
    imageUrl: tracks && getLargeVersion(tracks[0].artworkUrl),
  };
}

export default connect(mapStateToProps)(CardImage);

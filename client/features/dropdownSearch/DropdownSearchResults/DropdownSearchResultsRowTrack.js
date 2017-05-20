import { connect } from 'react-redux';
import { getTrackById } from 'client/features/entities/entitiesSelectors';
import defaultImageUrl from 'assets/images/default-artwork.png';
import DropdownSearchResultsRow from './DropdownSearchResultsRow';

const mapStateToProps = (state, { trackId }) => {
  const track = getTrackById(state, trackId);
  return ({
    imageUrl: track.artworkUrl || defaultImageUrl,
    itemLinkUrl: `/track/${trackId}`,
    itemTitle: track.title,
  });
};

export default connect(mapStateToProps)(DropdownSearchResultsRow);

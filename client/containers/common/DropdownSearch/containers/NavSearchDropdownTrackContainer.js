import { connect } from 'react-redux';
import { getTrackById } from 'client/features/entities/entitiesSelectors';
import defaultImageUrl from 'assets/images/default-artwork.png';
import NavSearchDropdownItem from '../components/NavSearchDropdownItem';

const mapStateToProps = (state, { trackId }) => {
  const track = getTrackById(state, trackId);
  return ({
    imageUrl: track.artworkUrl || defaultImageUrl,
    itemLinkUrl: `/track/${trackId}`,
    itemTitle: track.title,
  });
};

export default connect(mapStateToProps)(NavSearchDropdownItem);

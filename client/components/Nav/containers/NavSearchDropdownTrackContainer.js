import { connect } from 'react-redux';
import { getTrackById } from 'client/redux/modules/entities';
import defaultImageUrl from 'assets/images/default-artwork.png';
import NavSearchDropdownItem from '../components/NavSearchDropdownItem';

const mapStateToProps = (state, { trackId }) => {
  const track = getTrackById(state, trackId);
  return ({
    imageUrl: track.get('artworkUrl') || defaultImageUrl,
    itemLinkUrl: `/track/${track.get('id')}`,
    itemTitle: track.get('title'),
  });
};

export default connect(mapStateToProps)(NavSearchDropdownItem);

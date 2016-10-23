import { connect } from 'react-redux';
import { getTrackById } from 'client/redux/modules/reducers';
import defaultImageUrl from 'assets/images/default-artwork.png';
import NavSearchDropdownItem from '../components/NavSearchDropdownItem';

const mapStateToProps = (state, { trackId }) => {
  const track = getTrackById(state, trackId);
  return ({
    artworkUrl: track.getArtworkUrl(),
    defaultImageUrl,
    itemLinkUrl: `track/${track.getId()}`,
    itemTitle: track.getTitle()
  });
};

export default connect(mapStateToProps)(NavSearchDropdownItem);

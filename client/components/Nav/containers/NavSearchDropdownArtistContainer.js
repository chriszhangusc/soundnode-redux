import { connect } from 'react-redux';
import { getArtistById } from 'client/redux/modules/reducers';
import defaultImageUrl from 'assets/images/default-artist.png';
import NavSearchDropdownItem from '../components/NavSearchDropdownItem';

const mapStateToProps = (state, { artistId }) => {
  const artist = getArtistById(state, artistId);
  return ({
    artworkUrl: artist.getAvatarUrl(),
    defaultImageUrl,
    itemLinkUrl: `artist/${artist.getId()}`,
    itemTitle: artist.getUsername()
  });
};

export default connect(mapStateToProps)(NavSearchDropdownItem);

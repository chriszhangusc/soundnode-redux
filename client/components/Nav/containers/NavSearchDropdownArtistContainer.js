import { connect } from 'react-redux';
import { getArtistById } from 'client/redux/modules/entities';
import defaultImageUrl from 'assets/images/default-artist.png';
import NavSearchDropdownItem from '../components/NavSearchDropdownItem';

const mapStateToProps = (state, { artistId }) => {
  const artist = getArtistById(state, artistId);
  return ({
    imageUrl: artist.avatarUrl || defaultImageUrl,
    itemLinkUrl: `/artist/${artistId}`,
    itemTitle: artist.username,
  });
};

export default connect(mapStateToProps)(NavSearchDropdownItem);

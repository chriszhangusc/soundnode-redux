import { connect } from 'react-redux';
import { getArtistById } from 'client/redux/modules/entities';
import defaultImageUrl from 'assets/images/default-artist.png';
import NavSearchDropdownItem from '../components/NavSearchDropdownItem';

const mapStateToProps = (state, { artistId }) => {
  const artist = getArtistById(state, artistId);
  return ({
    imageUrl: artist.get('avatarUrl') || defaultImageUrl,
    itemLinkUrl: `/artist/${artist.get('id')}`,
    itemTitle: artist.get('username'),
  });
};

export default connect(mapStateToProps)(NavSearchDropdownItem);

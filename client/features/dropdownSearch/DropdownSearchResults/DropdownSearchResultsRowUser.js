import { connect } from 'react-redux';
import { getUserById } from 'client/features/entities/entitiesSelectors';
import defaultImageUrl from 'assets/images/default-artist.png';
import DropdownSearchResultsRow from './DropdownSearchResultsRow';

const mapStateToProps = (state, { userId }) => {
  const artist = getUserById(state, userId);
  return ({
    imageUrl: artist.avatarUrl || defaultImageUrl,
    itemLinkUrl: `/artist/${userId}`,
    itemTitle: artist.username,
  });
};

export default connect(mapStateToProps)(DropdownSearchResultsRow);

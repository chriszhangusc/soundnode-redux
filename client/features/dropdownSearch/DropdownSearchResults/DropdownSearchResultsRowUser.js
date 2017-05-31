import { connect } from 'react-redux';
import { getUserById } from 'client/features/entities/entitiesSelectors';
import defaultImageUrl from 'assets/images/default-artist.png';
import { USER_PROFILE_ROUTE } from 'client/common/constants/routeConsts';
import DropdownSearchResultsRow from './DropdownSearchResultsRow';

const mapStateToProps = (state, { userId }) => {
  const artist = getUserById(state, userId);
  return {
    imageUrl: artist.avatarUrl || defaultImageUrl,
    itemLinkUrl: `${USER_PROFILE_ROUTE}/${userId}`,
    itemTitle: artist.username,
  };
};

export default connect(mapStateToProps)(DropdownSearchResultsRow);

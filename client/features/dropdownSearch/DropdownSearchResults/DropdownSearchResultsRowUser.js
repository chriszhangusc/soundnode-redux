import { connect } from 'react-redux';
import { getUserById } from 'features/entities/entitiesSelectors';
import defaultAvatarUrl from 'assets/images/default-artist.png';
import { USER_PROFILE_ROUTE } from 'common/constants/routeConsts';
import DropdownSearchResultsRow from './DropdownSearchResultsRow';

const mapStateToProps = (state, { userId }) => {
  const artist = getUserById(state, userId);
  return {
    imageUrl: artist.avatarUrl || defaultAvatarUrl,
    itemLinkUrl: `${USER_PROFILE_ROUTE}/${userId}`,
    itemTitle: artist.username,
  };
};

export default connect(mapStateToProps)(DropdownSearchResultsRow);

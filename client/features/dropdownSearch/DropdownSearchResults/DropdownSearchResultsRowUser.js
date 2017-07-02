import { connect } from 'react-redux';
import { getUserById } from 'features/entities/entitiesSelectors';
import { USER_PROFILE_ROUTE } from 'common/constants/routeConsts';
import DropdownSearchResultsRow from './DropdownSearchResultsRow';

const mapStateToProps = (state, { userId }) => {
  const artist = getUserById(state, userId);
  return {
    type: 'user',
    imageUrl: artist.avatarUrl,
    itemLinkUrl: `${USER_PROFILE_ROUTE}/${userId}`,
    itemTitle: artist.username,
  };
};

export default connect(mapStateToProps)(DropdownSearchResultsRow);

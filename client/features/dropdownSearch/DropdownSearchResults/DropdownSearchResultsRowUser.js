import { connect } from 'react-redux';
import { getUserById } from 'features/entities/entitiesSelectors';
import { USER_PROFILE_ROUTE } from 'common/constants/routeConsts';
import DropdownSearchResultsRow from './DropdownSearchResultsRow';

const mapStateToProps = (state, { userId }) => {
  const user = getUserById(state, userId);
  return {
    type: 'user',
    avatarUrl: user && user.avatarUrl,
    linkUrl: `${USER_PROFILE_ROUTE}/${userId}`,
    title: user && user.username,
    subtitle: 'Artist',
  };
};

export default connect(mapStateToProps)(DropdownSearchResultsRow);

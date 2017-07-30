import { connect } from 'react-redux';
import { getUserById } from 'features/entities/entitiesSelectors';
import { USER_PROFILE_ROUTE } from 'common/constants/routeConsts';
import DropdownSearchResultsRow from './DropdownSearchResultsRow';

const mapStateToProps = (state, props) => {
  const { userId } = props;
  const { avatarUrl, username } = getUserById(state, userId);
  return {
    type: 'user',
    avatarUrl,
    linkUrl: `${USER_PROFILE_ROUTE}/${userId}`,
    title: username,
    subtitle: 'Artist',
  };
};

export default connect(mapStateToProps)(DropdownSearchResultsRow);

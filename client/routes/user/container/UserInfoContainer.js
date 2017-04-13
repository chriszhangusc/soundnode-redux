import { connect } from 'react-redux';
import { getUserById } from 'client/redux/modules/entities';
import { getLargeVersion, getMiniVersion } from 'client/utils/ImageUtils';
import UserInfo from '../components/UserInfo';

export const mapStateToProps = (state, { userId }) => {
  const user = getUserById(state, userId);
  const avatarUrl = user.avatarUrl;
  return {
    permalinkUrl: user.permalinkUrl,
    avatarUrl: getLargeVersion(avatarUrl),
    avatarUrlSmall: getMiniVersion(avatarUrl),
    username: user.username,
    followerCount: user.followersCount.toLocaleString(),
    description: user.description,
  };
};

export default connect(mapStateToProps)(UserInfo);

import { connect } from 'react-redux';
import { getUserById } from 'client/redux/modules/entities';
import { t500x500, mini } from 'client/constants/ImageConstants';
import { formatImageUrl } from 'client/utils/FormatUtils';
import UserInfo from '../components/UserInfo';

export const mapStateToProps = (state, { userId }) => {
  const user = getUserById(state, userId);
  const avatarUrl = user.avatarUrl;
  return {
    permalinkUrl: user.permalinkUrl,
    avatarUrl: formatImageUrl(avatarUrl, t500x500),
    avatarUrlSmall: formatImageUrl(avatarUrl, mini),
    username: user.username,
    followerCount: user.followersCount.toLocaleString(),
    description: user.description,
  };
};

export default connect(mapStateToProps)(UserInfo);

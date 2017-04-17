import React from 'react';
import PropTypes from 'prop-types';
// import ImageWithFallback from 'client/components/Images/ImageWithFallback';
import { DEFAULT_USER_AVATAR } from 'client/constants/ImageConsts';
import UserAvatar from './UserAvatar';
import UserName from './UserName';
import UserFollowers from './UserFollowers';
import UserDescription from './UserDescription';

const UserInfo = ({
  avatarUrl,
  avatarUrlSmall,
  username,
  followerCount,
  description,
  permalinkUrl,
}) => (
  <div className="user-info-container">
    <a href={permalinkUrl} target="_black" title="Go to SoundCloud">
      <UserAvatar src={avatarUrl} placeholderSrc={avatarUrlSmall} />
    </a>
    <div className="user-details">
      <UserName username={username} />
      <UserFollowers followerCount={followerCount} />
      <UserDescription text={description} />
    </div>
  </div>
);

UserInfo.defaultProps = {
  avatarUrl: undefined,
  avatarUrlSmall: undefined,
  username: undefined,
  followerCount: undefined,
  description: undefined,
  permalinkUrl: undefined,
};

UserInfo.propTypes = {
  avatarUrlSmall: PropTypes.string,
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  followerCount: PropTypes.string, // Formatted number
  description: PropTypes.string,
  permalinkUrl: PropTypes.string,
};

export default UserInfo;

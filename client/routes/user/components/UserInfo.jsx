import React from 'react';
import PropTypes from 'prop-types';
import ProgressiveImage from 'client/components/ProgressiveImage';
import ImageWithFallback from 'client/components/ImageWithFallback';
import { DEFAULT_USER_AVATAR } from 'client/constants/ImageConstants';

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
      {/*<ProgressiveImage
        largeImgUrl={avatarUrl}
        smallImgUrl={avatarUrlSmall}
        placeholderClassName="user-avatar"
      />*/}
      <ImageWithFallback alt="user avatar" src={avatarUrl} fallbackImageUrl={DEFAULT_USER_AVATAR} className="user-avatar" />
    </a>
    <div className="user-details">
      <h1 className="user-name">{username}</h1>
      <div className="user-followers">Followers: {followerCount}</div>
      <div className="user-description">{description}</div>
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

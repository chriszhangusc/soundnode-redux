import React from 'react';
import PropTypes from 'prop-types';
import ProgressiveImage from 'client/components/ProgressiveImage';

const UserInfo = ({
  avatarUrl,
  avatarUrlSmall,
  username,
  followerCount,
  description,
  permalinkUrl,
}) => (
  <div className="artist-info-container">
    <a href={permalinkUrl} target="_black" title="Go to SoundCloud">
      <ProgressiveImage
        largeImgUrl={avatarUrl}
        smallImgUrl={avatarUrlSmall}
        placeholderClassName="artist-avatar"
      />
    </a>
    <div className="artist-details">
      <h1 className="artist-name">{username}</h1>
      <div className="artist-followers">Followers: {followerCount}</div>
      <div className="artist-description">{description}</div>
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

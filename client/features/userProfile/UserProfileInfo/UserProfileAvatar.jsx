import React from 'react';
import PropTypes from 'prop-types';
import UserImage from 'common/components/images/UserImage';

function UserProfileAvatar({ avatarUrl, permalinkUrl }) {
  return <UserImage src={avatarUrl} linkTo={permalinkUrl} title="Go to SoundCloud" size="large" />;
}

UserProfileAvatar.defaultProps = {
  avatarUrl: null,
  permalinkUrl: null,
};

UserProfileAvatar.propTypes = {
  avatarUrl: PropTypes.string,
  permalinkUrl: PropTypes.string,
};

export default UserProfileAvatar;

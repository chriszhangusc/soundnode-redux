import React from 'react';
import PropTypes from 'prop-types';
import UserImage from 'common/components/images/UserImage';

function UserProfileImage({ avatarUrl, permalinkUrl }) {
  return <UserImage src={avatarUrl} linkTo={permalinkUrl} title="Go to SoundCloud" size="large" />;
}

UserProfileImage.defaultProps = {
  avatarUrl: null,
  permalinkUrl: null,
};

UserProfileImage.propTypes = {
  avatarUrl: PropTypes.string,
  permalinkUrl: PropTypes.string,
};

export default UserProfileImage;

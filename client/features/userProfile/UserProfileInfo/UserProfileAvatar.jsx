import React from 'react';
import PropTypes from 'prop-types';
import UserImage from 'common/components/images/UserImage';
import { getLargeVersion } from 'common/utils/imageUtils';
import { compose, mapProps } from 'recompose';

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

function userPropsMapper({ user }) {
  if (!user) return {};
  const { avatarUrl, permalinkUrl } = user;
  return {
    avatarUrl: getLargeVersion(avatarUrl),
    permalinkUrl,
  };
}

export default compose(mapProps(userPropsMapper))(UserProfileAvatar);

import React from 'react';
import PropTypes from 'prop-types';
import ColumnLayout from 'common/components/layouts/ColumnLayout';
import Username from './Username';
import UserFollowers from './UserFollowers';
import UserDescription from './UserDescription';

// Maybe tweak the style in the future

function UserProfileDetails({ username, followersCount, description }) {
  return (
    <ColumnLayout width="800px">
      <Username>
        {username}
      </Username>
      <UserFollowers>
        Followers: {followersCount}
      </UserFollowers>
      <UserDescription>
        {description}
      </UserDescription>
    </ColumnLayout>
  );
}

UserProfileDetails.propTypes = {
  username: PropTypes.string,
  followersCount: PropTypes.string,
  description: PropTypes.string,
};

UserProfileDetails.defaultProps = {
  username: '',
  followersCount: '',
  description: '',
};

export default UserProfileDetails;

import React from 'react';
import { connect } from 'react-redux';
import { getProfiledUser } from 'features/userProfile/userProfileSelectors';
import SplitPane from 'common/components/layouts/SplitPane';
import UserProfileDetails from './UserProfileDetails';
import UserProfileAvatar from './UserProfileAvatar';

function UserProfileInfo({ user }) {
  return (
    <SplitPane
      left={<UserProfileAvatar user={user} />}
      right={<UserProfileDetails user={user} />}
    />
  );
}

function mapStateToProps(state) {
  return {
    user: getProfiledUser(state),
  };
}

export default connect(mapStateToProps)(UserProfileInfo);

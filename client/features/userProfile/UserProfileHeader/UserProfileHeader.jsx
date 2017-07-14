import React from 'react';
import { connect } from 'react-redux';
import { getProfiledUser } from 'features/userProfile/userProfileSelectors';
import { getLargeVersion } from 'common/utils/imageUtils';
import SplitPane from 'common/components/layouts/SplitPane';
import UserProfileDetails from './UserProfileDetails';
import UserProfileImage from './UserProfileImage';

function UserProfileHeader({ avatarUrl, permalinkUrl, username, followersCount, description }) {
  const userProfileImage = <UserProfileImage avatarUrl={avatarUrl} permalinkUrl={permalinkUrl} />;
  const userProfileDetails = (
    <UserProfileDetails
      username={username}
      followersCount={followersCount}
      description={description}
    />
  );
  return <SplitPane left={userProfileImage} right={userProfileDetails} />;
}

function mapStateToProps(state) {
  const user = getProfiledUser(state);
  return {
    permalinkUrl: user && user.permalinkUrl,
    avatarUrl: user && getLargeVersion(user.avatarUrl),
    username: user && user.username,
    followersCount: user && user.followersCount.toLocaleString(),
    description: user && user.description,
  };
}

export default connect(mapStateToProps)(UserProfileHeader);

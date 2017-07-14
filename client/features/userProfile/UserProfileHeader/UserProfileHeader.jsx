import React from 'react';
import { connect } from 'react-redux';
import { getProfiledUser } from 'features/userProfile/userProfileSelectors';
import { getLargeVersion } from 'common/utils/imageUtils';
import SplitPane from 'common/components/SplitPane';
import UserProfileDetails from './UserProfileDetails';
import UserProfileImage from './UserProfileImage';

function UserProfileHeader({ avatarUrl, permalinkUrl, username, followerCount, description }) {
  const userProfileImage = <UserProfileImage avatarUrl={avatarUrl} permalinkUrl={permalinkUrl} />;
  const userProfileDetails = (
    <UserProfileDetails
      username={username}
      followerCount={followerCount}
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
    followerCount: user && user.followersCount.toLocaleString(),
    description: user && user.description,
  };
}

export default connect(mapStateToProps)(UserProfileHeader);

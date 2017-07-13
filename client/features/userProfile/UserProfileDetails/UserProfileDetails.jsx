import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLargeVersion } from 'common/utils/imageUtils';
import styled from 'styled-components';
import { getProfiledUser } from 'features/userProfile/userProfileSelectors';
import UserAvatar from './UserAvatar';
import UserName from './UserName';
import UserFollowers from './UserFollowers';
import UserDescription from './UserDescription';

const UserDetailsRowWrapper = styled.div`
  padding: 20px 0;
  display: flex;
`;

const UserDetailsColumnWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  margin-left: 20px;
`;

const UserProfileDetails = ({ avatarUrl, username, followerCount, description, permalinkUrl }) =>
  <UserDetailsRowWrapper>
    <UserAvatar avatarUrl={avatarUrl} permalinkUrl={permalinkUrl} />
    <UserDetailsColumnWrapper>
      <UserName username={username} />
      <UserFollowers followerCount={followerCount} />
      <UserDescription text={description} />
    </UserDetailsColumnWrapper>
  </UserDetailsRowWrapper>;

UserProfileDetails.defaultProps = {
  avatarUrlBlurry: '',
  avatarUrl: '',
  username: '',
  followerCount: 0, // Formatted number
  description: '',
  permalinkUrl: '',
};

UserProfileDetails.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  followerCount: PropTypes.string, // Formatted number
  description: PropTypes.string,
  permalinkUrl: PropTypes.string,
};

export const mapStateToProps = (state) => {
  const user = getProfiledUser(state);

  return {
    permalinkUrl: user.permalinkUrl,
    avatarUrl: getLargeVersion(user.avatarUrl),
    username: user.username,
    followerCount: user.followersCount.toLocaleString(),
    description: user.description,
  };
};

export default connect(mapStateToProps)(UserProfileDetails);

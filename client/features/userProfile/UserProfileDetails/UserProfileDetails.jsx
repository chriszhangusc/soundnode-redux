import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserById } from 'features/entities/entitiesSelectors';
import { getLargeVersion } from 'common/utils/imageUtils';
import styled from 'styled-components';
import Avatar from 'common/components/images/Avatar';
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

const UserAvatarWrapper = styled.div`
  margin-right: 50px;
`;

const UserProfileDetails = ({ avatarUrl, username, followerCount, description, permalinkUrl }) => (
  <UserDetailsRowWrapper>
    <UserAvatarWrapper>
      <Avatar
        src={avatarUrl}
        size="large"
        linkTo={permalinkUrl}
        external
        title="Go to SoundCloud"
      />
    </UserAvatarWrapper>
    <UserDetailsColumnWrapper>
      <UserName username={username} />
      <UserFollowers followerCount={followerCount} />
      <UserDescription text={description} />
    </UserDetailsColumnWrapper>
  </UserDetailsRowWrapper>
);

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

export const mapStateToProps = (state, { userId }) => {
  const user = getUserById(state, userId);
  const avatarUrl = user.avatarUrl;

  return {
    permalinkUrl: user.permalinkUrl,
    avatarUrl: getLargeVersion(avatarUrl),
    username: user.username,
    followerCount: user.followersCount.toLocaleString(),
    description: user.description,
  };
};

export default connect(mapStateToProps)(UserProfileDetails);

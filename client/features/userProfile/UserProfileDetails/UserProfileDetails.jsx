import React from 'react';
import PropTypes from 'prop-types';
// import ImageWithFallback from 'client/common/components/Images/ImageWithFallback';
import { DEFAULT_USER_AVATAR } from 'client/common/constants/ImageConsts';

import { connect } from 'react-redux';
import { getUsers } from 'client/features/entities/entitiesSelectors';
import { getLargeVersion, getMiniVersion } from 'client/common/utils/imageUtils';
import styled from 'styled-components';
import UserAvatar from './UserAvatar';
import UserName from './UserName';
import UserFollowers from './UserFollowers';
import UserDescription from './UserDescription';

export const mapStateToProps = (state, { userId }) => {
  const allUsers = getUsers(state);
  const user = allUsers[String(userId)];
  const avatarUrl = user.avatarUrl;

  return {
    permalinkUrl: user.permalinkUrl,
    avatarUrl: getLargeVersion(avatarUrl),
    avatarUrlSmall: getMiniVersion(avatarUrl),
    username: user.username,
    followerCount: user.followersCount.toLocaleString(),
    description: user.description,
  };
};

const UserDetailsRowWrapper = styled.div`
  padding: 20px 0;
  display: flex;
`;

const UserDetailsColumnWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 40px;
`;

const UserProfileDetails = ({
  avatarUrl,
  avatarUrlSmall,
  username,
  followerCount,
  description,
  permalinkUrl,
}) => (
  <UserDetailsRowWrapper>
    <a href={permalinkUrl} target="_black" title="Go to SoundCloud">
      <UserAvatar src={avatarUrl} placeholderSrc={avatarUrlSmall} />
    </a>
    <UserDetailsColumnWrapper>
      <UserName username={username} />
      <UserFollowers followerCount={followerCount} />
      <UserDescription text={description} />
    </UserDetailsColumnWrapper>
  </UserDetailsRowWrapper>
);

UserProfileDetails.propTypes = {
  avatarUrlSmall: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  followerCount: PropTypes.string.isRequired, // Formatted number
  description: PropTypes.string.isRequired,
  permalinkUrl: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(UserProfileDetails);

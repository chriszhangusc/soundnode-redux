import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserName from './UserName';
import UserFollowers from './UserFollowers';
import UserDescription from './UserDescription';

const UserDetailsColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  margin-left: 20px;
`;

function UserProfileDetails({ username, followerCount, description }) {
  return (
    <UserDetailsColumnWrapper>
      <UserName username={username} />
      <UserFollowers followerCount={followerCount} />
      <UserDescription text={description} />
    </UserDetailsColumnWrapper>
  );
}

UserProfileDetails.defaultProps = {
  username: '',
  followerCount: 0, // Formatted number
  description: '',
};

UserProfileDetails.propTypes = {
  username: PropTypes.string,
  followerCount: PropTypes.string, // Formatted number
  description: PropTypes.string,
};

export default UserProfileDetails;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from 'common/components/Title';
import { compose, mapProps } from 'recompose';
import UserFollowers from './UserFollowers';
import UserDescription from './UserDescription';

const UserDetailsColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  margin-left: 20px;
`;

function UserProfileDetails({ username, followersCount, description }) {
  return (
    <UserDetailsColumnWrapper>
      <Title>
        {username}
      </Title>
      <UserFollowers followersCount={followersCount} />
      <UserDescription text={description} />
    </UserDetailsColumnWrapper>
  );
}

function userPropsMapper({ user }) {
  if (!user) return {};
  const { username = '', followersCount = '0', description = '' } = user;
  return {
    username,
    followersCount: followersCount.toLocaleString(),
    description,
  };
}

export default compose(mapProps(userPropsMapper))(UserProfileDetails);

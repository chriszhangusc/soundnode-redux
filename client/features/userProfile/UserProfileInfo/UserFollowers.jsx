import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UserFollowersContainer = styled.div`
  margin-top: 10px;
  color: ${props => props.theme.fontColorSub};
`;

function UserFollowers({ followersCount }) {
  return (
    <UserFollowersContainer>
      Followers: {followersCount}
    </UserFollowersContainer>
  );
}

UserFollowers.defaultProps = {
  followersCount: '',
};

UserFollowers.propTypes = {
  followersCount: PropTypes.string,
};

export default UserFollowers;

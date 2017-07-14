import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_PRIMARY } from 'app/css/colors';

const UserFollowersContainer = styled.div`
  margin-top: 10px;
  color: ${FONT_COLOR_PRIMARY};
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

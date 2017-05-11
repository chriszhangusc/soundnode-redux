import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_PRIMARY } from 'client/app/css/colors';

const UserFollowersContainer = styled.div`
  margin: 10px 0;
  color: ${FONT_COLOR_PRIMARY};
`;

function UserFollowers({ followerCount }) {
  return <UserFollowersContainer>Followers: {followerCount}</UserFollowersContainer>;
}

UserFollowers.propTypes = {
  followerCount: PropTypes.string.isRequired,
};

export default UserFollowers;

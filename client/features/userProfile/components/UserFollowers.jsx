import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_PRIMARY } from 'client/css/colors';

const UserFollowersContainer = styled.div`
  margin: 10px 0;
  color: ${FONT_COLOR_PRIMARY};
`;

function UserFollowers({ followerCount }) {
  return <UserFollowersContainer>Followers: {followerCount}</UserFollowersContainer>;
}

// PropTypes.defaultProps = {
// };

UserFollowers.propTypes = {
  followerCount: PropTypes.string.isRequired,
};

export default UserFollowers;

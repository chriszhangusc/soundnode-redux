import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Title from 'common/components/Title';

// Putting these small components in one file or separate files?

const UserDetailsColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
`;

// Maybe tweak the style in the future
const Username = Title.extend`margin-bottom: 10px;`;

const UserFollowers = styled.div`
  color: ${props => props.theme.fontColorSub};
  margin-bottom: 10px;
`;

const UserDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
  overflow: scroll;
  height: 240px;
  width: 500px;
  color: ${props => props.theme.fontColorSub};
  white-space: pre-wrap;
`;

function UserProfileDetails({ username, followersCount, description }) {
  return (
    <UserDetailsColumnWrapper>
      <Username>
        {username}
      </Username>
      <UserFollowers>
        Followers: {followersCount}
      </UserFollowers>
      <UserDescription>
        {description}
      </UserDescription>
    </UserDetailsColumnWrapper>
  );
}

UserProfileDetails.propTypes = {
  username: PropTypes.string,
  followersCount: PropTypes.string,
  description: PropTypes.string,
};

UserProfileDetails.defaultProps = {
  username: '',
  followersCount: '',
  description: '',
};

export default UserProfileDetails;

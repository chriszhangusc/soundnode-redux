import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ColumnLayout from 'common/components/layouts/ColumnLayout';
import Heading from 'common/components/Heading';

// Putting these small components in one file or separate files?

// Maybe tweak the style in the future
const Username = Heading.extend`margin: 0;`;

const UserFollowers = styled.div`color: ${props => props.theme.colors.fontColorSub};`;

const UserDescription = styled.p`
  font-size: 1rem;
  overflow: scroll;
  height: 240px;
  width: 500px;
  color: ${props => props.theme.colors.fontColorSub};
  white-space: pre-wrap;
`;

function UserProfileDetails({ username, followersCount, description }) {
  return (
    <ColumnLayout width="800px">
      <Username>
        {username}
      </Username>
      <UserFollowers>
        Followers: {followersCount}
      </UserFollowers>
      <UserDescription>
        {description}
      </UserDescription>
    </ColumnLayout>
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

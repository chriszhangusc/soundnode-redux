import React from 'react';
import PropTypes from 'prop-types';
import EnhancedImage from 'common/components/images/EnhancedImage';
import styled from 'styled-components';

const Avatar = styled.div`
  height: 350px;
  width: 350px;
  margin-right: 50px;
`;

function UserAvatar(props) {
  return (
    <Avatar>
      <EnhancedImage circle {...props} />
    </Avatar>
  );
}

UserAvatar.defaultProps = {};

UserAvatar.propTypes = {
  src: PropTypes.string.isRequired,
};

export default UserAvatar;

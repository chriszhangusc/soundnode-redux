import React from 'react';
import PropTypes from 'prop-types';
import FadeinImage from 'client/common/components/Images/FadeinImage';
import styled from 'styled-components';

const Avatar = styled.div`
  height: 350px;
  width: 350px;
`;

function UserAvatar(props) {
  return (
    <Avatar>
      <FadeinImage {...props} />
    </Avatar>
  );
}

UserAvatar.defaultProps = {
};

UserAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  placeholderSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default UserAvatar;

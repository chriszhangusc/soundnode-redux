import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'common/components/images/Avatar';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-right: 50px;
`;

function UserAvatar() {
  return (
    <Wrapper>
      <Avatar />
    </Wrapper>
  );
}

UserAvatar.defaultProps = {};

UserAvatar.propTypes = {
  src: PropTypes.string.isRequired,
};

export default UserAvatar;

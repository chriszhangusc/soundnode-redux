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
      <Avatar
        src={avatarUrl}
        size="large"
        linkTo={permalinkUrl}
        target="_blank"
        title="Go to SoundCloud"
      />
    </Wrapper>
  );
}

UserAvatar.defaultProps = {};

UserAvatar.propTypes = {
  src: PropTypes.string.isRequired,
};

export default UserAvatar;

{
  /* <Avatar
        src={avatarUrl}
        size="large"
        linkTo={permalinkUrl}
        external
        title="Go to SoundCloud"
      />*/
}

import React from 'react';
import PropTypes from 'prop-types';
import UserImage from 'common/components/images/UserImage';
import styled from 'styled-components';

const Wrapper = styled.div`margin-right: 50px;`;

function UserAvatar({ avatarUrl, permalinkUrl }) {
  return (
    <Wrapper>
      <UserImage src={avatarUrl} linkTo={permalinkUrl} title="Go to SoundCloud" size="large" />
    </Wrapper>
  );
}

UserAvatar.defaultProps = {};

UserAvatar.propTypes = {
  avatarUrl: PropTypes.string,
  permalinkUrl: PropTypes.string,
};

export default UserAvatar;

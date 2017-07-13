import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserImage from 'common/components/images/UserImage';
import RouterLink from 'common/components/links/RouterLink';

const AvatarWrapper = styled.div`margin-right: 10px;`;

export default function CommentUserAvatar({ linkTo, userAvatarUrl }) {
  return (
    <AvatarWrapper>
      <RouterLink to={linkTo}>
        <UserImage src={userAvatarUrl} size="small" />
      </RouterLink>
    </AvatarWrapper>
  );
}

CommentUserAvatar.defaultProps = {
  linkTo: '',
  userAvatarUrl: '',
};

CommentUserAvatar.propTypes = {
  linkTo: PropTypes.string,
  userAvatarUrl: PropTypes.string,
};

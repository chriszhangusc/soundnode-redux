import React from 'react';
import PropTypes from 'prop-types';
import UserImage from 'common/components/images/UserImage';
import RouterLink from 'common/components/links/RouterLink';
import Wrapper from './Wrapper';

export default function CommentUserAvatar({ linkTo, userAvatarUrl }) {
  return (
    <Wrapper>
      <RouterLink to={linkTo}>
        <UserImage src={userAvatarUrl} size="small" />
      </RouterLink>
    </Wrapper>
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

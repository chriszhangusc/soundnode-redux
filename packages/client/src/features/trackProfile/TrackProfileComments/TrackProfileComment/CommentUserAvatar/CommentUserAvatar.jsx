import React from 'react';
import PropTypes from 'prop-types';
import UserImage from '@soundnode-redux/client/src/common/components/images/UserImage';
import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';
import Wrapper from './Wrapper';

export default function CommentUserAvatar({ linkTo, userAvatarUrl }) {
  return (
    <Wrapper>
      <RouterLink to={linkTo}>
        <UserImage src={userAvatarUrl} size="tiny" />
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

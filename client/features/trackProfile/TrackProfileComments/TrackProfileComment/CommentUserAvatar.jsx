import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from 'common/components/images/Avatar';
import { Link } from 'react-router-dom';

const AvatarWrapper = styled.div`
  margin-right: 10px;
`;

export default function CommentUserAvatar({ linkTo, userAvatarUrl }) {
  return (
    <AvatarWrapper>
      <Link to={linkTo}>
        <Avatar src={userAvatarUrl} />
      </Link>
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

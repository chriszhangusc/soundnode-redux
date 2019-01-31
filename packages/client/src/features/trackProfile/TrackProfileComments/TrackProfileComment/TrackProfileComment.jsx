import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE_ROUTE } from '@soundnode-redux/client/src/common/constants/routeConsts';
import { getSmallVersion } from '@soundnode-redux/client/src/common/utils/imageUtils';
import CommentUserAvatar from './CommentUserAvatar';
import CommentUsername from './CommentUsername';
import Wrapper from './Wrapper';
import CommentDetailWrapper from './CommentDetailWrapper';
import CommentHeaderWrapper from './CommentHeaderWrapper';
import CommentTimestamp from './CommentTimestamp';
import CommentBody from './CommentBody';

function TrackProfileComment({ comment }) {
  const { body, user, createdAt } = comment;

  const { id, avatarUrl, username } = user;

  const userLink = `${USER_PROFILE_ROUTE}/${id}`;

  return (
    <Wrapper>
      <CommentUserAvatar linkTo={userLink} userAvatarUrl={getSmallVersion(avatarUrl)} />
      <CommentDetailWrapper>
        <CommentHeaderWrapper>
          <CommentUsername to={userLink}>{username}</CommentUsername>
          <CommentTimestamp>{createdAt.replace('+0000', '')}</CommentTimestamp>
        </CommentHeaderWrapper>
        <CommentBody>{body}</CommentBody>
      </CommentDetailWrapper>
    </Wrapper>
  );
}

TrackProfileComment.defaultProps = {
  userAvatarUrl: '',
  username: '',
  commentBody: '',
  commentTimestamp: '',
  userId: null,
};

TrackProfileComment.propTypes = {
  userAvatarUrl: PropTypes.string,
  username: PropTypes.string,
  commentBody: PropTypes.string,
  commentTimestamp: PropTypes.string,
  userId: PropTypes.number,
};

export default TrackProfileComment;
